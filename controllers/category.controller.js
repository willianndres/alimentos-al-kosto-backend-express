const Category = require("../models/category.model");
const mongoose = require("mongoose");
const id = mongoose.Types.ObjectId();
exports.create = async (req, res, next) => {
  const createCategory = await Category.create({
    name: req.body.name,
    description: req.body.description,
    imagen: req.file.filename,
  });
  if (typeof createCategory == "object") {
    res.status(200).send({
      message: "Se ha creado correctamente la categoria.",
    });
  }
};

exports.getAllCategories = async (req, res, next) => {
  const allCategories = await Category.find({});
  if (typeof allCategories == "object") {
    res.status(200).send({
      all_categories: allCategories,
    });
  }
};

exports.getAllSubCategories = async (req, res, next) => {
  const categoryObject = await Category.findOne({ _id: req.params.categoryId })
    .exec();
  if (!categoryObject) {
    res.status(404).send({
      message: "No se encontro el recurso.",
    });
  } else {
    const allSubCategory = typeof categoryObject.sub_categories !== "undefined"
      ? categoryObject.sub_categories
      : [];
    res.status(200).send({
      category_object: categoryObject,
      all_sub_categories: allSubCategory,
    });
  }
};

exports.createSubCategory = async (req, res, next) => {
  const objectSubCats = {
    _id: mongoose.Types.ObjectId(),
    name: req.body.name,
    description: req.body.description,
    imagen: "./sub-categories/" + req.file.filename,
  };
  const createSubCategory = await Category.findByIdAndUpdate(
    req.body.category_id,
    {
      $push: { sub_categories: objectSubCats },
    },
  );
  if (typeof objectSubCats == "object") {
    res.status(200).send({
      message: "Se ha creado correctamente la sub categoria.",
    });
  }
};
