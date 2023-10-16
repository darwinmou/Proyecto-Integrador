const mongoose = require("mongoose");

const cartsSchema = new mongoose.Schema({
  quantity: { type: Number, require: true },
  total: { type: Number, require: true },
});

const cartsModel = mongoose.model("carts", cartsSchema);
module.exports = cartsModel;