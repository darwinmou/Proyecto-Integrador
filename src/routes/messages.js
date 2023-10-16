const express = require("express");
const router = express.Router();

const messagesModel = require("../../Dao/models/messages.model");


  router.post("/", async (req, res) => {
    console.log(req.body);
    const {user, message} = req.body
    if (!user || !message) {
      return res.status(400).json({ error: "Faltan parametros" });
    }
    const result = await messagesModel.create({user, message})
    res.send({result: "success", payload: result})
  });
  
  module.exports = router;