const express = require("express");
const multer = require("multer");

const path = require("path");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const categoryController = require("../controllers/category.controller");
const productController = require("../controllers/product.controller");
const authMiddleware = require("../middlewares/auth");
const userController = require("../controllers/user.controller");
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const ext = file.originalname.split(".")[1];
    cb(null, Date.now() + "." + ext); //Appending .jpg
  },
});
var storageSubCats = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/sub-categories/");
  },
  filename: function (req, file, cb) {
    const ext = file.originalname.split(".")[1];
    cb(null, Date.now() + "." + ext); //Appending .jpg
  },
});
const upload = multer({ storage: storage });
const uploadSubCategories = multer({ storage: storageSubCats });
/* GET home page. */

router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.post("/api/auth", authController.auth);
router.post(
  "/api/category-add",
  authMiddleware.authenticateToken,
  upload.single("files"),
  categoryController.create,
);
router.post(
  "/api/products-add",
  authMiddleware.authenticateToken,
  upload.single("files"),
  productController.create,
);
router.get("/api/check_token", authMiddleware.authenticateToken);
router.post(
  "/api/user-add",
  authMiddleware.authenticateToken,
  userController.create,
);
router.get(
  "/api/all-users",
  authMiddleware.authenticateToken,
  userController.getAllUsers,
);
router.get(
  "/api/all-categories",
  authMiddleware.authenticateToken,
  categoryController.getAllCategories,
);

router.get(
  "/api/all-products",
  authMiddleware.authenticateToken,
  productController.getAllProducts,
);
router.get(
  "/api/get-all-sub-category/:categoryId",
  authMiddleware.authenticateToken,
  categoryController.getAllSubCategories,
);
router.post(
  "/api/sub-category-add",
  authMiddleware.authenticateToken,
  uploadSubCategories.single("files"),
  categoryController.createSubCategory,
);
module.exports = router;
