const User = require("../models/user.model");
const authMiddleware = require("../middlewares/auth");
const crypto = require("crypto");

exports.auth = async (req, res, next) => {
  if (!req.body) {
    res.status(404).send({ message: "Not data provided." });
    return;
  }
  const passwordHash = crypto.createHash("md5").update(req.body.password)
    .digest("hex");

  const getUser = await User.findOne({
    email: req.body.email,
    password: passwordHash,
  }).exec();

  if (typeof getUser !== "undefined") {
    const simpleUser = {
      name: getUser.name,
      email: getUser.email,
    };
    const getToken = authMiddleware.generateAccessToken(simpleUser);
    if (!getToken) {
      res.status(403).send({ message: "Bad access." });
    } else {
      res.status(200).send({ token: getToken, user: simpleUser });
    }
  }
};
