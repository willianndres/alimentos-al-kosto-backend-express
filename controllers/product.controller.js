const Product = require("../models/product.model");

exports.create = async (req, res, next) => {
  const createProduct = await Product.create({
    name: req.body.name,
    price: parseFloat(req.body.price).toFixed(2),
    old_price: parseFloat(req.body.old_price).toFixed(2),
    categories: req.body.categories,
    imagen: req.file.filename,
  });
  if (typeof createProduct == "object") {
    res.status(200).send({
      message: "Se ha creado correctamente la categoria.",
    });
  }
};

exports.getAllProducts = async (req, res, next) => {
  const allProducts = await Product.find({});
  if (typeof allProducts == "object") {
    res.status(200).send({
      all_products: allProducts,
    });
  }
};

