const express = require("express");
const Property = require("../models/Property");
const router = express.Router();

/**
 * @description - Returns all the properties
 */
router.get("/", async (req, res) => {
  try {
    // pagination
    const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
    const limit = parseInt(req.query.limit) || 10; // Default to 10 properties per page if not provided

    const startIndex = (page - 1) * limit;

    // filters
    const filters = {};
    if (req.query.title) {
      filters.title = new RegExp(req.query.title, "i"); // Case-insensitive regex search
    }
    if (req.query.address) {
      filters.address = new RegExp(req.query.address, "i"); // Case-insensitive regex search
    }
    if (req.query.minPrice) {
      filters.price = { $gte: parseFloat(req.query.minPrice) };
    }
    if (req.query.maxPrice) {
      filters.price = {
        ...filters.price,
        $lte: parseFloat(req.query.maxPrice),
      };
    }

    const totalProperties = await Property.countDocuments(filters);
    const properties = await Property.find(filters)
      .skip(startIndex)
      .limit(limit);

    res.status(200).json({
      totalProperties,
      totalPages: Math.ceil(totalProperties / limit),
      currentPage: page,
      properties,
    });
  } catch (error) {
    console.log("Error while searching properties ", error);
    res.status(500).json({ message: "Error fetching properties", error });
  }
});

module.exports = router;
