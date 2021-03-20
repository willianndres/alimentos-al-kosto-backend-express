const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  price: {
    type: String,
  },
  old_price: {
    type: String,
  },
  imagen: {
    type: String,
  },
  categories: {
    type: String,
  },
}, {
  collection: "products",
  versionKey: false,
  timestamps: true,
});
module.exports = Product = mongoose.model("Product", productSchema);
