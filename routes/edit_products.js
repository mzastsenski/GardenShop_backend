const router = require("express").Router();
const { auth } = require("../middleware/auth");
const client = require("../database/db");
const products = client.db("gardenshop").collection("products");
const multer = require("multer");
const url = require("../utils/url");
const storage = multer.diskStorage({
  destination: `${url}/`,
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

router.post("/add", auth, async (req, res) => {
  products.insertOne(req.body);
  res.json(200);
});

router.put("/edit", auth, (req, res) => {
  const { id } = req.body;
  products.updateOne({ id }, { $set: req.body });
  res.json(200);
});

router.delete("/delete/:id", auth, (req, res) => {
  products.deleteOne({ id: +req.params.id });
  res.json(200);
});

router.post("/upload", upload.single("file"), (req, res) => {
  res.sendStatus(200)
});

module.exports = router;
