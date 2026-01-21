const jwt = require("jsonwebtoken");

const generateAccessToken = (userId) => {
  console.log("Access token generated");
  return jwt.sign(
    { userId },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
  );
};

const generateRefreshToken = (userId) => {
  console.log("Refresh token generated");
  return jwt.sign(
    { userId },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
  );
};

module.exports = {
  generateAccessToken,
  generateRefreshToken
};
