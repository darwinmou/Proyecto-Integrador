const express = require("express");
const router = express.Router();
const fs = require("fs");
const FileManager = require("../../Dao/utils/fileManager");

const fileManager = new FileManager("src/files/products.json");

const productsModel = require("../../Dao/models/products.model");

router.get("/", async (req, res) => {
  const limit = req.query.limit;
  const products = await productsModel.find();

  if (limit) {
    res.json(products.slice(0, limit));
  } else {
    res.json(products);
  }
  // });
});

router.get("/:pid", async (req, res) => {
  const productId = req.params.pid;
  try {
    const product = await productsModel.findById(productId);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: "Producto no encontrado." });
    }
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json({ error: `Error al buscar producto: ${error.message}` });
  }

  // });
});

router.post("/", async (req, res) => {
  const productAdd = req.body;
  try {
    fileManager.validateProduct(productAdd);
    const product = await productsModel.create(productAdd);
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error });
  }
});

router.put("/:pid", async (req, res) => {
  const id = req.params.pid;
  const productUpdate = req.body;
  try {
    const response = await productsModel.updateOne({ _id: id }, productUpdate);
    console.log(response);
    response.modifiedCount &&
      res.json({ message: "Producto actualizado exitosamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Ocurrió un error al actualizar" });
  }
});

router.delete("/:pid", async (req, res) => {
  const id = req.params.pid;

  try {
    const response = await productsModel.deleteOne({ _id: id });
    console.log(response);
    response.deletedCount &&
      res.json({ message: "Producto eliminado exitosamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Ocurrió un error al borrar" });
  }
});

module.exports = router;
