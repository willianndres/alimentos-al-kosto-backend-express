const mongoose = require("mongoose");
const SchemaTypes = mongoose.Schema.Types;
const categorySchema = new mongoose.Schema({
  name: {
    type: String,
  },
  imagen: {
    type: String,
  },
  description: {
    type: String,
  },
}, {
  collection: "categories",
  versionKey: false,
  timestamps: true,
});
module.exports = Category = mongoose.model("Category", categorySchema);
