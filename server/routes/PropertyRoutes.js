const express = require("express");
const router = express.Router();
const Property = require("../models/Property");
const multer = require("multer");
const path = require("path");
const { isAuthenticated } = require("../middleware/authMiddleware");

/*
  AWS S3 setup + multer
*/
// const { S3Client } = require("@aws-sdk/client-s3");
// const multerS3 = require("multer-s3");
// const { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, S3_BUCKET_NAME, AWS_REGION } =
//   process.env;

// create s3 instance using S3Client
// const s3 = new S3Client({
//   credentials: {
//     accessKeyId: AWS_ACCESS_KEY_ID,
//     secretAccessKey: AWS_SECRET_ACCESS_KEY,
//   },
//   region: AWS_REGION,
//   endpoint: `https://s3.${AWS_REGION}.amazonaws.com`,
// });

// multer file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    // rename the file
    cb(null, "rentify" + Date.now() + path.extname(file.originalname));
  },
});

// aws-Multer
// const awsMulterStorage = multerS3({
//   s3: s3,
//   bucket: S3_BUCKET_NAME,
//   metadata: function (req, file, cb) {
//     cb(null, { fieldName: file.fieldname });
//   },
//   key: function (req, file, cb) {
//     cb(null, Date.now().toString() + "-" + file.originalname);
//   },
//   contentType: multerS3.AUTO_CONTENT_TYPE,
// });

const upload = multer({ storage: storage });

router.post(
  "/",
  isAuthenticated,
  upload.array("photos", 10),
  async (req, res) => {
    try {
      const { title, address, description, price, beds } = req.body;
      const perks = JSON.parse(req.body.perks);
      const user_id = req.user.id;
      // for aws s3
      // const photos = req.files.map((file) => file.key); // Use 'key' to get the file name in S3
      //  for multer local
      const photos = req.files.map((file) => {
        console.log("file = ", file);
        return file.filename;
      });

      const property = new Property({
        user_id,
        title,
        address,
        photos,
        description,
        perks,
        price,
        beds,
      });

      await property.save();

      res
        .status(201)
        .json({ message: "Property added successfully", property });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

/**
 * @desc - Update property listing
 * @access Private
 */
router.put(
  "/:property_id",
  isAuthenticated,
  upload.array("photos", 10),
  async (req, res) => {
    try {
      const { property_id } = req.params;
      const property = await Property.findById(property_id);

      if (!property) {
        return res.status(404).json({ message: "Property not found" });
      }

      const { title, address, description, price, beds } = req.body;
      const perks = JSON.parse(req.body.perks);
      const user_id = req.user.id;
      // for local use => file.filename
      const newPhotos = req.files.map((file) => file.filename);
      const existingPhotos = property.photos;

      // Update property fields
      property.title = title || property.title;
      property.address = address || property.address;
      property.description = description || property.description;
      property.price = price || property.price;
      property.beds = beds || property.beds;
      property.perks = perks || property.perks;
      property.photos = [...existingPhotos, ...newPhotos];

      await property.save();

      res
        .status(200)
        .json({ message: "Property updated successfully", property });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

// return all properties by curremt user
router.get("/", isAuthenticated, async (req, res) => {
  try {
    // Find properties where the user_id matches the authenticated user's id
    const properties = await Property.find({ user_id: req.user.id });
    res.status(200).json(properties);
  } catch (error) {
    console.error("Error fetching properties:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Get property by ID
router.get("/:property_id", async (req, res) => {
  const { property_id } = req.params;
  try {
    const property = await Property.findById(property_id);
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }
    res.status(200).json(property);
  } catch (error) {
    console.error("Error fetching property:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// handles both like and unlike
// router.post("/like", async (req, res) => {
//   const { propertyId, userId } = req.body;

//   try {
//     const property = await Property.findById(propertyId);

//     if (!property) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Property not found" });
//     }

//     const userIndex = property.likes.indexOf(userId);

//     if (userIndex > -1) {
//       // User already liked, so unlike
//       property.likes.splice(userIndex, 1);
//     } else {
//       // User not liked yet, so like
//       property.likes.push(userId);
//     }

//     await property.save();

//     res.json({ success: true });
//   } catch (error) {
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// });

// handles both like and unlike
router.post("/like", async (req, res) => {
  const { propertyId, userId } = req.body;

  try {
    let property;

    // Check if the user has already liked the property
    const isLiked = await Property.exists({ _id: propertyId, likes: userId });

    if (isLiked) {
      // User already liked, so unlike
      property = await Property.findByIdAndUpdate(
        propertyId,
        { $pull: { likes: userId } },
        { new: true } // Return the updated document
      );
    } else {
      // User not liked yet, so like
      property = await Property.findByIdAndUpdate(
        propertyId,
        { $addToSet: { likes: userId } },
        { new: true } // Return the updated document
      );
    }

    if (!property) {
      return res
        .status(404)
        .json({ success: false, message: "Property not found" });
    }

    // Get the updated likes count
    const updatedLikesCount = property.likes.length;
    const updatedLikes = property.likes;

    console.log("updating likes and broadcasting...");

    res.json({
      success: true,
      likesCount: updatedLikesCount,
      likes: updatedLikes,
    });
  } catch (error) {
    console.error("Error updating property:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

router.delete("/:property_id", isAuthenticated, async (req, res) => {
  try {
    const { property_id } = req.params;
    const user_id = req.user.id;

    // Find the property by ID and check if the current user is the owner
    const property = await Property.findOne({ _id: property_id, user_id });

    if (!property) {
      return res.status(404).json({
        message: "Property not found or you're not authorized to delete it",
      });
    }

    // Delete the property
    await Property.findByIdAndDelete(property_id);

    res.status(200).json({ message: "Property deleted successfully" });
  } catch (error) {
    console.error("Error deleting property:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
