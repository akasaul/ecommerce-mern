const Product = require('../model/Product');
const User = require('../model/User');
const asyncHandler = require('express-async-handler');

const addToCart = asyncHandler( 
    async (req, res) => {
    const {id, qty} = req.body;
    const user = req.user;

    // Check if Product exist in db
    let product;

    try {
        product = await Product.findById(id); 

        if(!product) {
            res.status(404);
            throw new Error('Product Not Found');
        }

    } catch(err) {
        res.status(500);
        throw new Error('Failed to fetch The Product');
    }

    // Add to cart 

    // Check the Item is Already in the cart 

    product = user.cart.find(item => item.id === id);

    // If no Item in Cart 

    if(!product) {
        user.cart.push({prodId: id, qty});
        const item = await user.save();
        res.json(item);
    }



    // If Item already exists 

    if(product) {
        product.qty += qty;
        await user.save();
    }
    res.json(user);

})

const removeFromCart = asyncHandler( 
    async (req, res) => {
    const {id} = req.params;
    const user = req.user;


    // Check if Product exist in db
    let product;

    try {
        product = await Product.findById(id); 

        if(!product) {
            res.status(404);
            throw new Error('Product Not Found');
        }

    } catch(err) {
        res.status(500);
        throw new Error('Failed to fetch The Product');
    }

    // Removing from Cart 

    // Check if cart is already empty
    if(user.cart.length === 0) {
        res.status(400);
        throw new Error('Cart is Already empty');
    }

    // Filter out the selected Item 

    user.cart = user.cart.filter(item => item.prodId.toString() !== id.toString());

    await user.save();

    res.json(user);

})

const toggleFavorite = asyncHandler( 
    async (req, res) => {
    const {id} = req.body;
    const user = req.user;

    // Check if Product exist in db
    let product;
    

    try {
        product = await Product.findById(id); 

        if(!product) {
            res.status(404);
            throw new Error('Product Not Found');
        }

    } catch(err) {
        res.status(500);
        throw new Error('Failed to fetch The Product');
    }

    // Add to Favorites 

    // Check the Item is Already in the Favorites 

    product = user.favs.find(item => item.toString() === id.toString());

    // If no Item in Favorites 

    if(!product) {
        user.favs.push(id);
        await user.save();
        res.json(user);
    }

    // If Item already exists remove the item

    if(product) {
        user.favs = user.favs.filter(item => item.toString() !== id.toString());
        await user.save();
        res.json(user);
    }


})



const getFavs = asyncHandler( 
    async (req, res) => {
    const user = req.user;
    res.json(user.favs);
})




module.exports = {
    addToCart,
    removeFromCart,
    toggleFavorite,
    getFavs
}