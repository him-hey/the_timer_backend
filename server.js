const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const PORT = process.env.PORT;
const DB_URL = process.env.DB_URL;
const DB_NAME = process.env.DB_NAME;
const productModel = require("./models/product_model");
const userModel = require("./models/user_model");
const app = express();

app.use(express.json());

//DB connection 
mongoose.connect(DB_URL + DB_NAME);

//------------------PRODUCTS ROUTE---------------------------------//

//get all the products
app.get("/products", (req, res)=>{
    productModel.productModel.find()
    .then((result)=>{
        res.send(result);
    })
    .catch((error)=>{console.log(error)});
})

//get product detail
app.get("/product", (req, res)=>{
    productModel.productModel.findById(req.query.id)
    .then((result)=>{
        res.send(result);
    })
    .catch((error)=>{console.log(error)});
})

//add product
app.post("/addProduct", (req, res)=>{
    productModel.productModel.create(req.body)
    .then((result)=>{
        res.send("product added!");
    })
    .catch((error)=>{console.log(error)});
})

//------------------------AUTHENTICATION--------------------------//


//login function with username and password
app.post('/login', async (req, res)=>{
    let user = null;
    userModel.userModel.findOne({username:req.body.username})
    .then( async (result)=>{
        user = result.username;
        if(user == null){
            return res.status(400).send("cannot find the user!");
        }
        try{
            if( await bcrypt.compare(req.body.password, result.password)){
                res.send("successed...");
            }else{
                res.send("cannot login");
            }
        } 
        catch{
            res.status(500).send()
        }
    })
})

//register function with username, email and password
app.post('/register', async (req, res)=>{
    try{
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        let user = {username: req.body.username, email: req.body.email, password: hashedPassword};
        userModel.userModel.create(user)
        .then((result)=>{res.status(200).send("Register successed!")})
       
    }
    catch{
        res.status(500).send();
    }
})

//logout function
app.post('/logout', (req, res)=>{
    
})

//----------------------------START SERVER-------------------------//
app.listen(PORT, (()=>{
    console.log("http://localhost:" + PORT);
}))