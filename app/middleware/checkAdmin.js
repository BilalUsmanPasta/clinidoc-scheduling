const jwt = require("jsonwebtoken");
const User = require("../models/User");

const dotenv = require("dotenv");
dotenv.config();

const checkAdmin = async (req, res, next) => {
  try {
    const { email } = req.user;
    const isAdmin = await User.isUserAdmin(email);
    if (!isAdmin) {
      return res.status(403).send("Unauthorized");
    }
    next();
  } catch (error) {
    res.status(403).send("Unauthorized");
  }
};

module.exports = checkAdmin;
