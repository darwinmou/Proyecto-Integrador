const express = require("express");
const router = express.Router();
const fs = require("fs");
const FileManager = require("../utils/fileManager");

const fileManager = new FileManager("src/files/products.json");

router.get("/", (req, res) => {
  const limit = req.query.limit;
  fs.readFile("src/files/products.json", "utf8", (err, data) => {
    if (err) {
      res
        .status(500)
        .json({ err: err, msg: "Error al leer el archivo de productos." });
      return;
    }

    const products = JSON.parse(data);

    if (limit) {
      res.json(products.slice(0, limit));
    } else {
      res.json(products);
    }
  });
});

router.get("/:pid", (req, res) => {
  const productId = parseInt(req.params.pid);
  fs.readFile("src/files/products.json", "utf8", (err, data) => {
    if (err) {
      res.status(500).json({ error: "Error al leer el archivo de productos." });
      return;
    }

    const products = JSON.parse(data);
    const product = products.find((p) => p.id === productId);

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: "Producto no encontrado." });
    }
  });
});

router.post("/", (req, res) => {
  const productAdd = req.body;
  try {
    const product = fileManager.addProduct(productAdd, res);
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error });
  }
});

router.put("/:pid", (req, res) => {
  const id = parseInt(req.params.pid)
  console.log(id);
  const productUpdate = req.body
  try {
     fileManager.updateProduct(id, productUpdate, res)
    //  res.json(update)
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Ocurrió un error al actualizar"})
  }
});

router.delete("/:pid", (req, res) => {
  const id = parseInt(req.params.pid)

  try {
    fileManager.deleteProduct(id, res)
 } catch (error) {
  console.error(error);
   res.status(500).json({ error: "Ocurrió un error al borrar"})
 }
});

module.exports = router;
