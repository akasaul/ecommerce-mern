const asyncHandler = require('express-async-handler');
const Product = require('../model/Product');
const {validationResult} = require('express-validator');
const { SchemaType, Schema } = require('mongoose');

const addProduct = asyncHandler(
    async (req, res) => {
        const {name, price, desc, category, qty, imageUrl } = req.body;
        const errors = validationResult(req);
        let product;

        if(!name || !price || !desc || !qty || !imageUrl) {
            res.status(400);
            throw new Error('Please Provide the required fields')    
        }

        if(!errors.isEmpty()) {
            res.status(400);
            throw new Error(errors.array()[0].msg);
        }

        try {
            product = await Product.create({
                name, price, category, qty, description: desc, postedBy: req.user._id, imageUrl
            })
        } catch(err) {
            res.status(500);
            throw new Error('Failed to Create product');
        }
        res.status(200).json(product);
    }
)  

const getProducts = asyncHandler(
    async (req, res) => {
        const currentPage = Number(req.query.page);

        const productsPerPage = 10;
        const skip = (currentPage - 1) * productsPerPage;

        try {
            const products = await Product.find()
                .skip(skip)
                .limit(productsPerPage)
                .exec()

                res.status(200).json(products);
        } catch(err) {
            res.status(500);
            throw new Error('Failed to fetch products');
        }
    }
)

const getProduct = asyncHandler(
    async (req, res) => {
        const {prodId} = req.params;
        try {
            const product = await Product.findById(prodId).populate('postedBy');
            if(!product) {
                throw new Error('Product not Found');
            }
            res.status(200).json(product);
        } catch(err) {
            res.status(500);
            throw new Error('Failed to fetch the product');
        }
    }
)

const updateProduct = asyncHandler(
    async (req, res) => {

        const {_id : id} = req.user; 
        const { prodId } = req.params;

        const {name, price, desc, imageUrl, category, qty} = req.body;

        const errors = validationResult(req);
        let product;

        if(!name || !price || !desc || !imageUrl || !category || !qty) {
            res.status(400);
            throw new Error('Provide the required fields')    
        }

        if(!errors.isEmpty()) {
            res.status(400);
            throw new Error(errors.array()[0].msg);
        }

        try {
            const productRes = await Product.findById(prodId);
        } catch(err) {
            res.status(401);
            throw new Error('Product Not Found');
        }


        try {

            const { postedBy } = product;
            
            if(postedBy.toString() !== id.toString()) {
                res.status(401);
                throw new Error('Not Authorized');
            }

            product.name = name;
            product.price = price;
            product.desc = desc;
            product.imageUrl = imageUrl;

            const newProduct = await product.save();
            res.status(200).json(newProduct);
            
        } catch(err) {
            res.status(500);
            throw new Error('Failed to update the product');
        }
        res.status(200).json(product);
    }
)  

const deleteProduct = asyncHandler(
    async (req, res) => {
        const {_id : id} = req.user; 
        const { prodId } = req.params;

        let product;
        
        // Search for the product 

        try {
            product = await Product.findById(prodId);
        } catch(err) {
            throw new Error('Failed to fetch the product');
        }

        // Product not Found 

        if(!product) {
            throw new Error('Product Not Found');
        }

        // Authorized or not 

        const { postedBy } = product;
            
        if(postedBy.toString() !== id.toString()) {
            res.status(401);
            throw new Error('Not Authorized');
        } 

        // Delete the product 

        try {
            product = await Product.findByIdAndDelete(prodId);
            res.status(202);
            res.json({msg: 'Deleted Item'});
        } catch (err) {
            throw new Error(err.message);
        }

    }
)


module.exports = {addProduct, getProducts, getProduct, updateProduct, deleteProduct}