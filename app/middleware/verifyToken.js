const jwt = require("jsonwebtoken");
const User = require("../models1/User");

const dotenv = require("dotenv");
dotenv.config();

const verifyToken = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(400).send("Unauthenticated");
  }
  let token = req.headers && req.headers["authorization"].split(" ")[1];
  console.log({ token });
  if (!token) {
    return res.status(400).send("Invalid token");
  }
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).send("Unauthenticated");
  }
};

module.exports = verifyToken;
