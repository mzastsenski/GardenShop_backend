const router = require("express").Router();
const { auth } = require("../middleware/auth");
const client = require("../database/db");
const users = client.db("gardenshop").collection("users");

router.post("/get", auth, async (req, res) => {
  const { user } = req.body;
  const result = await users.findOne({ user });
  res.json(result.cart);
});

router.post("/save", auth, (req, res) => {
  const { user, cart } = req.body;
  users.updateOne(
    { user },
    {
      $set: {
        cart: cart,
      },
    }
  );
  res.json(200);
});

module.exports = router;