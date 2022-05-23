const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const PORT = process.env.PORT;
const DB_URL = process.env.DB_URL;
const DB_NAME = process.env.DB_NAME;
const productModel = require("./models/product_model");
const app = express();

app.use(express.json());

//DB connection 
mongoose.connect(DB_URL + DB_NAME);


//get all the products
app.get("/products", (req, res)=>{
    productModel.productModel.find()
    .then((result)=>{
        res.send(result);
    })
    .catch((error)=>{console.log(error)});
})
app.listen(PORT, (()=>{
    console.log("http://localhost:" + PORT);
}))