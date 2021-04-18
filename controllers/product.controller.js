const Product = require("../models/product.model");
const Category = require("../models/category.model");

exports.create = async (req, res, next) => {
  const categoryArr = req.body.categories.split(",");
  const cat = [];
  const subCats = [];
  const categoryDef = [];
  categoryArr.map((e) => {
    if (e.indexOf("-") > 0) {
      const arrCatSubCat = e.split("-");
      if (!cat.includes(arrCatSubCat[0])) cat.push(arrCatSubCat[0]);
      if (!subCats.includes(arrCatSubCat[1])) subCats.push(arrCatSubCat[1]);
    } else {
      if (!cat.includes(e)) cat.push(e);
    }
  });
  if (cat.length > 0) {
    for (const element of cat) {
      const categoryObject = await Category.findById(element).exec();
      const subCategoryArr = [];
      if (typeof categoryObject.sub_categories !== "undefined" && categoryObject.sub_categories.length > 0) {
        if (subCats.length > 0) {
          subCats.map((elementSub) => {
            const existSubCatInCat = categoryObject.sub_categories.filter((e) => {
              return e._id == elementSub;
            });
            if (existSubCatInCat.length > 0) subCategoryArr.push(existSubCatInCat[0]);
          });
        }
      }
      categoryObject.sub_categories = subCategoryArr;
      categoryDef.push(categoryObject);
    }
  }
  const createProduct = await Product.create({
    name: req.body.name,
    price: parseFloat(req.body.price).toFixed(2),
    old_price: parseFloat(req.body.old_price).toFixed(2),
    categories: categoryDef,
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
