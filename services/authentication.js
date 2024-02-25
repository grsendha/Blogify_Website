const JWT = require("jsonwebtoken");
const User = require("../models/user");
const secretKey = "superman11";

function createTokenForUser(user) {
  const payload = {
    fullName: user.fullName,
    _id: user._id,
    email: user.email,
    profileImg: user.profileImg,
    role: user.role,
  };
  const token = JWT.sign(payload, secretKey);
  return token;
}

function validateToken(token) {
  const payload = JWT.verify(token, secretKey);
  return payload;
}

module.exports = {
  createTokenForUser,
  validateToken,
};
