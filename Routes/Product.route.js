const express = require('express');
const router = express.Router();

//Importing the product model
const Product = require('../Models/Product.model');

//Get all the products list
router.get('/', async (req, res, next) => {
    try{
        const results = await Product.find();
        res.send(results);
    } catch (error) {
        console.log(error.message);
    }
});

//Getting a single product
router.get('/', async (req, res, next) => {
    
});

//Adding a single product to the database
router.post('/', async (req, res, next) => {
    //console.log(req.body);
    try{
        const product = new Product(req.body);
        const result = await product.save();
        res.send(result);
    } catch (error){
        console.log(error.message);
    }
    //const product = new Product({
    //    name: req.body.name,
    //    price: req.body.price
    //});
    //product.save()
    //.then((result) => {
    //    console.log(result);
    //    res.send(result);
    //})
    //.catch((err) => {
    //    console.log(err.message);
    //});
});


//Exporting the module
module.exports = router;