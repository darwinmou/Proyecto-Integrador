const mongoose = require("mongoose");

const productsSchema = new mongoose.Schema({
  title: { type: String, require: true },
  description: { type: String, require: true },
  category: { type: String, require: true },
  code: { type: String, require: true },
  status: { type: String, require: true },
  image: { type: String, require: true },
  price: {type:Number, require:true},
  stock: {type: Number, require:true}
});

const productsModel = mongoose.model("products", productsSchema);
module.exports = productsModel;