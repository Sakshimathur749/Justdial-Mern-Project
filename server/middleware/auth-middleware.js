const jwt = require("jsonwebtoken");
const User = require("../modals/user-modal");
const Vendor = require('../modals/vendor-modal');
const mongoose = require('mongoose');

const auth = async (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }
  
  try {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error("JWT secret key is missing. Check .env file.");
    }
    const decoded = jwt.verify(token, secret);  
    if (decoded.id === 'defaultAdminId') {
      req.user = { id: 'defaultAdminId', role: 'Admin' }; 
      return next();
    }
    if (decoded.vendor === 'vendorpanel') {
      req.user = { id: decoded.id, role: 'vendor', vendor: 'vendorpanel' };
      return next();
    }
    const user = await Vendor.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    req.user = user;
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({
        message: `Session expired. Token expired at ${err.expiredAt}. Please log in again.`,
      });
    }
    return res.status(400).json({ message: "Invalid token" });
  }
};

module.exports = { auth };
