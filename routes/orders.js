const router = require("express").Router();
const { auth } = require("../middleware/auth");
const client = require("../database/db");
const orders = client.db("gardenshop").collection("orders");
const projection = { projection: { _id: 0 } };

router.post("/get", auth, async (req, res) => {
  const { user } = req.body;
  const query = user === "Admin" ? {} : { user };
  const result = await orders.find(query, projection).toArray();
  res.json(result);
});

router.post("/post", auth, (req, res) => {
  const { cart, user } = req.body;
  let date = new Date().toLocaleString("de-DE", {
    day: "numeric",
    month: "short", // short or 2-digit
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });
  orders.insertOne({
    id: +(Date.now() / 100).toFixed(),
    user,
    products: cart,
    date,
  });
  res.json(200);
});

router.delete("/delete/:id", auth, (req, res) => {
  orders.deleteOne({ id: +req.params.id });
  res.json(200);
});

module.exports = router;
