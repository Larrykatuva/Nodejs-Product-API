const Product = require('../Models/Product.model');
const createError = require('http-errors');
const mongoose = require('mongoose');


/**
 * Get All the products
 */
module.exports = {

    /**
     * 
     * @param {none} req 
     * @param {Product List} res 
     * @param {error} next.error
     */
    getAllProducts: async (req, res, next) => {
        try{
            const results = await Product.find();
            res.send(results);
        } catch (error) {
            console.log(error.message);
        }
    },

    /**
     *
     * @param {name, price} req.body
     * @param {results or Error}  next.error
     * @returns Newly created Product
     */
    createNewProduct: async (req, res, next) => {
        //console.log(req.body);
        try{
            const product = new Product(req.body);
            const result = await product.save();
            res.send(result);
        } catch (error){
            if(error.name === 'ValidationError') {
                next(createError(422, error.message));
                return;
            }
            next(error);
        }
    },

    /**
     * 
     * @param {id} req.params.id
     * @param {*} res 
     * @param {error} next.error 
     * @returns Updated product
     */
    findProductById: async (req, res, next) => {
        const id = req.params.id;
        try{
            const product = await Product.findById(id);
            if(!product){
                throw createError(404, 'Product does not exist');
            }
            res.send(product);
        } catch (error) {
            if(error instanceof mongoose.CastError) {
                next(createError(400, "Invalid Product id"));
                return;
            }
            next(error);
        }
    },

    /***
     * Updating a product by Id
     */
    updateProductById: async (req, res, next) => {
        //res.send("updating the product");
        try{
            const id = req.params.id;
            const updates = req.body; 
            const options = { new: true};
            const result = await Product.findByIdAndUpdate(id, updates, options);
            if(!result){
                throw createError(404, "Product does not exist");
            }
            res.send(result);
        } catch (error) {
            if( error instanceof mongoose.CastError) {
                return next(createError(400, "Invalid product Id"));
            }
            next(error);
        }
    },


    /**
     * Deleting a product by id
     */
    deleteProductById: async (req, res, next) => {
        const id = req.params.id;
        try{
            const result = await Product.findByIdAndDelete(id);
            if(!result){
                throw createError(404, 'Product does not exist');
            }
            res.send(result);
        } catch (error) {
            if(error instanceof mongoose.CastError) {
                next(createError(400, "Invalid Product id"));
                return;
            }
            next(error);
        }
    }
};