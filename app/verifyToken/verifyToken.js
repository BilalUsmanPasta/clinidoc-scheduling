const jwt = require("jsonwebtoken");
const User = require("../models1/User");

const dotenv = require("dotenv");
dotenv.config();

const verifyToken = async (token) => {
  if (!token) {
    return { status: 404, message: "no token" };
  }

  return await jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET,
    function (err, decoded) {
      if (err) {
        console.log(err);
        const error = { status: 404, message: err };
        return error;
      } else {
        // get user
        console.log(decoded);
        const decode = { status: 200, message: decoded };
        return decode;
      }
    }
  );
};
module.exports = verifyToken;
