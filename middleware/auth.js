const jwt = require("jsonwebtoken");
const { newAccessToken } = require("../utils/jwt");

const auth = (req, res, next) => {
  const token = req.cookies.token;
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (
      err ||
      (req.params.user && req.params.user !== user.name) ||
      (req.body.user && req.body.user !== user.name)
    ) {
      return res.json(401);
    }

    let exp = (1000 * user.exp - Date.now()) / 1000 / 60;
    if (exp < 20) {
      const newToken = newAccessToken({ name: user.name });
      res.cookie("token", newToken, {
        httpOnly: true,
        maxAge: 21 * 24 * 60 * 60 * 1000,
      });
    }
    next();
  });
};

module.exports = { auth };
