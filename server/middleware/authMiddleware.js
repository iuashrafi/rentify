const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const isAuthenticated = async (req, res, next) => {
  // Extract the token from the cookies
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }

    // console.log("decoded=  ", decoded);

    // If the token is valid, attach the decoded user information to the request object
    req.user = decoded;
    next();
  });
};

module.exports = { isAuthenticated };
