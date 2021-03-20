const User = require("../models/user.model");

exports.create = async (req, res, next) => {
  const checkEmail = await User.findOne({ email: req.body.email }).exec();
  if (checkEmail) {
    res.status(500).send({
      message: "El email ya esta en uso, por favor proporcionar otro.",
    });
  }
  const createUser = await User.create(req.body);
  if (typeof createUser == "object") {
    res.status(200).send({
      message: "Se ha creado correctamente el usuario.",
    });
  }
};

exports.getAllUsers = async (req, res, next) => {
  const allUsers = await User.find({});
  if (typeof allUsers == "object") {
    res.status(200).send({
      all_users: allUsers,
    });
  }
};
