const { addProduct } = require('../controller/productController');
const protect = require('../middleware/protect');

const router = require('express').Router();

router.post('/add', protect, addProduct)

module.exports = router;