const express = require("express");
const app = express();

const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const User = require("./models/User");

// env variables
const PORT = process.env.PORT || 4000;
const MONGO_URL = process.env.MONGO_URL;

// middlewares
app.use(cookieParser());
app.use(express.json());
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use("/uploads", express.static(__dirname + "/uploads"));

// Connecting to MongoDb database
mongoose
  .connect(MONGO_URL)
  .then(() => console.log("[MONGO_DB] Connected successfully!"))
  .catch((error) =>
    console.error(`[MONGO_DB] Connecting failed! ERROR:`, error)
  );

// routes
const authRoutes = require("./routes/AuthRoutes");
const propertyRoutes = require("./routes/PropertyRoutes");
const searchRoutes = require("./routes/SearchRoutes");
const emailRoutes = require("./routes/EmailRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/property", propertyRoutes);
app.use("/api/search", searchRoutes);
app.use("/api/email", emailRoutes);

// for user context
app.get("/api/profile", (req, res) => {
  const { token } = req.cookies;
  console.log("cookies=", req.cookies);
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, userData) => {
      if (err) throw err;
      const { fname, lname, email, phone, _id } = await User.findById(
        userData.id
      );
      console.log({ fname, lname, email, phone, _id });
      res.json({ fname, lname, email, phone, _id });
    });
  } else {
    res.json(null);
  }
});

// for testing
app.get("/test", (req, res) => {
  res.send("Hello world from Rentify");
});

// Server Listening on PORT
app.listen(PORT, () => {
  console.log(`[SERVER] Running on PORT ${PORT}`);
});
