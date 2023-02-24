const router = require("express").Router();
const { auth } = require("../middleware/auth");
const client = require("../database/db");
const users = client.db("gardenshop").collection("users");

router.post("/get", auth, async (req, res) => {
  const { user } = req.body;
  const result = await users.findOne({ user });
  res.json(result.wishlist);
});

router.post("/save", auth, (req, res) => {
  const { user, wishlist } = req.body;
  users.updateOne(
    { user },
    {
      $set: {
        wishlist: wishlist,
      },
    }
  );
  res.json(200);
});

module.exports = router;