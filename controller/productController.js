const Product = require('../model/Product');

const addProduct = (req, res, next) => {
    res.send('add product');
    next();
}


module.exports = {
    addProduct
};