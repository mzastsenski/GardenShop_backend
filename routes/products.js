const express = require("express");
require("dotenv").config();
const router = express.Router();
const client = require("../database/db");
const products = client.db("gardenshop").collection("products");
const projection = { projection: { _id: 0 } };

router.get("/all", async (_, res) => {
  const result = await products.find({}, projection).toArray();
  res.json(result);
});

router.get("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const products = client.db("gardenshop").collection("products");
  const result = await products.findOne({ id }, projection);
  res.json(result);
});

module.exports = router;
