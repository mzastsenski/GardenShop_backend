const express = require("express");
require("dotenv").config();
const router = express.Router();
const client = require("../database/db");
const categories = client.db("gardenshop").collection("categories");
const products = client.db("gardenshop").collection("products");
const projection = { projection: { _id: 0 } };

router.get("/all", async (req, res) => {
  const result = await categories.find({}, projection).toArray();
  res.json(result);
});

router.get("/:id", async (req, res) => {
  const categoryId = parseInt(req.params.id);
  const result = await products.find({ categoryId }, projection).toArray();
  res.json(result);
});

module.exports = router;
