const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

/**
 * @desc API endpoint to create a new user i.e. Registering a new user
 * @route POST /api/auth/register
 * @access Public
 */
router.post("/register", async (req, res) => {
  const { fname, lname, email, password, confirmPassword, phone } = req.body;

  // Check if any of required fields are missing
  if (!fname || !lname || !email || !password || !confirmPassword || !phone) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  try {
    // Check if user with the provided email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists!" });
    }

    // Generate salt and hash the password
    const bcryptSalt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, bcryptSalt);

    // Create new user document in the database
    const userDoc = await User.create({
      fname,
      lname,
      email,
      password: hashedPassword,
      phone,
    });

    // Return the newly created user document
    res.json(userDoc);
  } catch (error) {
    // Logging the error for debugging
    console.log("[SERVER] Error occured during registeration, ERROR", error);
    // Return error message in case of any exception
    res.status(500).json({
      message: "Internal server error",
    });
  }
});

/**
 * @desc API endpoint for user login
 * @route POST /api/auth/login
 * @access Public
 */
router.post("/login", async (req, res) => {
  // Destructuring email and password from request body
  const { email, password } = req.body;

  try {
    // Check if the user exists in the database
    const userDoc = await User.findOne({ email });
    if (!userDoc) {
      // If user is not found, return 404 Not Found error
      return res.status(404).json({ message: "User does not exists!" });
    }

    // Compare the provided password with the hashed password stored in the database
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (!passOk) {
      // If password does not match, return 422 Unprocessable Entity error
      return res.status(422).json({ message: "Incorrect password!" });
    }

    // Generate JWT token for authentication
    jwt.sign(
      {
        email: userDoc.email,
        id: userDoc._id,
      },
      JWT_SECRET,
      {},
      (err, token) => {
        if (err) {
          // If error occurs while generating token, throw error
          throw err;
        }
        console.log({ token });
        // Set JWT token as a cookie and return user data
        res
          .cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
          })
          .json(userDoc);
      }
    );
  } catch (error) {
    // If any other error occurs, return 500 Internal Server Error
    console.log("[SERVER] Error occured during login, ERROR", error);
    res.status(500).json({ message: "Internal Server error" });
  }
});

/**
 * @desc API endpoint for logging out user
 * @route POST /api/auth/logout
 * @access Private (by logged in users)
 */
router.post("/logout", (req, res) => {
  // Clearing the token cookie and returning true upon successful logout
  res.cookie("token", "").json(true);
});

/**
 * @desc API endpoint for getting user(seller/buyer) details
 * @route POST /api/auth/:user_id
 * @access Private (by logged in users only)
 */
router.get("/:user_id", async (req, res) => {
  try {
    const { user_id } = req.params;
    const user = await User.findById(user_id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "internal server error", error });
  }
});
module.exports = router;
