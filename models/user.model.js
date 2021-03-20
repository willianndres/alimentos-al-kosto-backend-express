const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  lastname: {
    type: String,
  },
  email: {
    type: String,
  },
  address: {
    type: String,
  },
  rol: {
    type: String
  },
  password: {
    type: String,
  },
  
}, {
  collection: "users",
  versionKey: false,
  timestamps: true,
});
module.exports = User = mongoose.model("User", userSchema);
