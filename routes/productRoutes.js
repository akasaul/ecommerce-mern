const { addProduct } = require('../controller/productController');

const router = require('express').Router();


router.post('/add', addProduct)

module.exports = router;