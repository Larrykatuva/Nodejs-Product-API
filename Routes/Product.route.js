const express = require('express');
const router = express.Router();
const createError = require('http-errors');
const mongoose = require('mongoose');
//Importing the product model
const Product = require('../Models/Product.model');
//Importing controllers
const ProductController = require('../Controllers/Product.Controller');

/**
 * Getting a list of all products
 */
router.get('/', ProductController.getAllProducts);

/*
*Adding a single product to the database
*/
router.post('/', ProductController.createNewProduct);

/**
 * Getting a single product
 * Arguments: id
 */
 router.get('/:id', ProductController.findProductById);

/**
 * Updating a product by ID
 * Arguments: id  
 */
router.patch('/:id', ProductController.updateProductById);

/**
 * Deleting a product by ID
 * Arguments: id
 */
 router.delete('/:id', ProductController.deleteProductById);


//Exporting the module
module.exports = router;