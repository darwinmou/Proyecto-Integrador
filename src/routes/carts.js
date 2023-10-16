const express = require("express");
const router = express.Router();
const FileManager = require("../../Dao/utils/fileManager");
const cartsModel = require("../../Dao/models/carts.model")


const fileManager = new FileManager("src/files/carrito.json");

// router.post("/", (req, res) => {
//     try {
//       const newCart = fileManager.createCart()
//       res.json(newCart);
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: error });
//     }
//   });

  router.post("/", async (req, res) => {
    const {quantity, total} = req.body
    if (!quantity || !total) {
       res.status(400).json({ error: "Faltan parametros" });
    }
    const result = await cartsModel.create({quantity, total})
    res.send({result: "success", payload: result})
  });
  
  module.exports = router;