const jwt = require("jsonwebtoken");

const newAccessToken = (user) => {
  return jwt.sign({ name: user.name }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "60m",
  });
};

const getUserFromToken = (req) => {
  if (req.cookies.token) {
    return jwt.verify(
      req.cookies.token,
      process.env.ACCESS_TOKEN_SECRET,
      (err, user) => user.name
    );
  }
};

module.exports = { newAccessToken, getUserFromToken };
