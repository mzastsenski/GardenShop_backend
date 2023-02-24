const router = require("express").Router();
const { auth } = require("../middleware/auth");
const { newAccessToken } = require("../utils/jwt");
const client = require("../database/db");
const users = client.db("gardenshop").collection("users");
const bcrypt = require("bcrypt");
const saltRounds = 10;

router.post("/checkUser", auth, (_, res) => res.json(200));

router.post("/login", async (req, res) => {
  const { user, wishlist, cart } = req.body;
  const bodyPass = req.body.pass;
  const finded = await users.findOne({ user });
  if (!finded) res.json(401);
  else {
    const checked = await bcrypt.compare(bodyPass, finded.pass);
    if (!checked) {
      res.json(401);
    } else {
      const accessToken = newAccessToken({ name: req.body.user });
      res.cookie("token", accessToken, {
        httpOnly: true,
        maxAge: 3 * 24 * 60 * 60 * 1000,
      });
      users.updateOne(
        { user },
        {
          $addToSet: {
            wishlist: {
              $each: wishlist,
            },
            cart: {
              $each: cart,
            },
          },
        }
      );
      res.json(user);
    }
  }
});

router.post("/signUp", async (req, res) => {
  const user = req.body.user;
  const bodyPass = req.body.pass;
  const find = await users.findOne({ user });
  if (find) {
    res.json(401);
  } else {
    const pass = await bcrypt.hash(bodyPass, saltRounds);
    await users.insertOne({ user, pass, cart: [], wishlist: [] });
    res.json(200);
  }
});

router.post("/logout", (_, res) => {
  res.clearCookie("token");
  res.json(200);
});

module.exports = router;
