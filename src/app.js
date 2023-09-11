const express = require("express")
const app = express()
const PORT = 8080
const products = require("./routes/products.js")

app.use(express.json())
app.use("/api/products", products);

app.listen(PORT, () => {
    console.log(`Server escuchando en el puerto ${PORT}`);
})

