const asyncHandler = require('express-async-handler');
const Product = require('../model/Product');
const {validationResult} = require('express-validator');
const { Schema } = require('mongoose');


// Add Product 
const addProduct = asyncHandler(
    async (req, res) => {
        const {name, price, desc, category, qty, imageUrl } = req.body;
        const errors = validationResult(req);
        let product;

        // Check for inputs 

        if(!name || !price || !desc || !qty || !imageUrl) {
            res.status(400);
            throw new Error('Please Provide the required fields')    
        }

        // Check for errors 

        if(!errors.isEmpty()) {
            res.status(400);
            throw new Error(errors.array()[0].msg);
        }

        // create new product 

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

// Get Products 
const getProducts = asyncHandler(
    async (req, res) => {
        const currentPage = Number(req.query.page);

        const productsPerPage = 5;
        const skip = (currentPage - 1) * productsPerPage;

        
        try {
            const products = await Product.find()
                .skip(skip)
                .limit(productsPerPage)
                .sort({createdAt: 'desc'})
                .exec();

                res.status(200).json(products);
        } catch(err) {
            res.status(500);
            throw new Error('Failed to fetch products');
        }
    }
)

// Get Product 
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

// Update Product 
const updateProduct = asyncHandler(
    async (req, res) => {
        const {name, desc, price, qty, category, imageUrl} = req.body;
        const {_id : id} = req.user; 
        const { prodId } = req.params;

        const errors = validationResult(req);


        //Check for inputs 

        if(!name || !desc || !price || !qty || !category || !imageUrl) {
            res.status(422);
            throw new Error('Please Provide all fields');
        }

        // Check for errors
        
        if(!errors.isEmpty()) {
            res.status(400);
            throw new Error(errors.array()[0].msg);
        }

        // Updating the product 

        let product;
        
        // Search for the product 

        try {
            product = await Product.findById(prodId);
        } catch(err) {
            res.status(400);
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

        // Update the product 

        try {

            product.name = name;
            product.description = desc;
            product.price = price;
            product.qty = qty;
            product.category = category;
            product.imageUrl = imageUrl;

            await product.save();     
            
            res.status(202);

            res.json(product);
        } catch (err) {
            throw new Error(err.message);
        }

    }
)

// Delete Product 
const deleteProduct = asyncHandler(
    async (req, res) => {
        const {_id : id} = req.user; 
        const { prodId } = req.params;

        let product;
        
        // Search for the product 

        try {
            product = await Product.findById(prodId);
        } catch(err) {
            res.status(404);
            throw new Error('Failed to fetch the product');
        }

        // Product not Found 

        if(!product) {
            res.status(404);
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

// Search Product 
const searchProduct = asyncHandler(
    async (req, res) => {
        let {keyword} = req.query;
        keyword = keyword.toLowerCase().trim();
        const products = await  Product.find().populate('postedBy', '-password -cart -token');


        const filteredProducts = products.filter(({name, description, category, postedBy})=> {
            return name.toLowerCase().includes(keyword) ||  
                description.toLowerCase().includes(keyword) || 
                category.toLowerCase().includes(keyword) ||
                (postedBy !== null &&
                postedBy?.name?.toLowerCase().includes(keyword))
        })

        res.json(filteredProducts);
    }
)

// Rate Product 
const rateProduct = asyncHandler(
    async (req, res) => {
        const { prodId } = req.params;
        const { value } = req.body;
        const {_id : userId} = req.user;
        const errors = validationResult(req);

        // No rating provided 

        if(!value) {
            res.status(400);
            throw new Error('Rating Should be Provided');
        }

        // When Validation fails

        if(!errors.isEmpty()) {
            res.status(400);
            throw new Error(errors.array()[0].msg);
        }

        const product = await Product.findById(prodId);

        // Check if product is found 

        if(!product) {
            res.status(404);
            throw new Error('Item Not Found');
        }

        // check if user already rated 

        const rateIndex =  product.rating.findIndex((rate) => rate?.userId.toString() === userId.toString())

        if(rateIndex === -1) {
            product.rating.push({userId, prodId, value});
            await product.save();
        } else {
            product.rating[rateIndex].value = value;
            await product.save();
        }

        res.json(product);
    }
)


module.exports = {addProduct, getProducts, getProduct, updateProduct, deleteProduct, searchProduct, rateProduct}