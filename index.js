const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname + "/frontend"));
app.use((_, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(cookieParser());

app.use("/products", require("./routes/products.js"));
app.use("/category", require("./routes/category.js"));
app.use("/api", require("./routes/authentication.js"));
app.use("/cart", require("./routes/cart.js"));
app.use("/wishlist", require("./routes/wishlist.js"));
app.use("/orders", require("./routes/orders.js"));
app.use("/editproducts", require("./routes/edit_products.js"));

app.get("*", (_, res) =>  res.sendFile( __dirname + "/frontend/index.html"));

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
