const express = require('express');
const router = express.Router();
const protect = require('../middleware/protect');
const {body} = require('express-validator')
const multer = require('multer');
const upload = multer({ dest: 'uploads/' })


const { addProduct, getProducts, getProduct, updateProduct, deleteProduct, searchProduct} = require('../controller/productController');

router.post('/add-product', [
    body('name').isLength({min: 5}).withMessage('Name Must be at least 5 characters').isAlphanumeric('en-US', {ignore: ' '}).withMessage('Name cant contain special characters'),
    body('price').isNumeric().withMessage('Price Should only be in Numbers').isFloat({min: 1}).withMessage('Price cant be less that 0$'),
    body('desc').isLength({min: 5, max: 100}).withMessage('Description Must be between 5 and 100 characters'),
    body('category').isIn(['food', 'other', 'instrument', 'cloth', 'furniture', 'electronics']).withMessage('Invalid category Provided'),
    body('qty').isNumeric().withMessage('Quantity Should be in Numbers').isFloat({min: 1}).withMessage('Price cant be less that 0$'),
    body('imageUrl').isURL().withMessage('Enter a valid URL')
], protect, addProduct);

router.get('/search', searchProduct);

router.get('/', getProducts);

router.delete('/:prodId', protect, deleteProduct);

router.route('/:prodId').get(getProduct).put([
    body('name').isLength({min: 5}).withMessage('Name Must be at least 5 characters').isAlphanumeric('en-US', {ignore: ' '}).withMessage('Name cant contain special characters'),
    body('price').isNumeric().withMessage('Price Should only be in Numbers').isFloat({min: 0}).withMessage('Price cant be less that 0$'),
    body('desc').isLength({min: 5, max: 100}).withMessage('Description Must be between 5 and 100 characters'),
    body('category').isIn(['food', 'other', 'instrument', 'cloth', 'furniture', 'electronics']).withMessage('Invalid category Provided'),
    body('qty').isNumeric().withMessage('Quantity Should be in Numbers').isFloat({min: 0}).withMessage('Price cant be less that 0$'),
    body('imageUrl').isURL().withMessage('Enter a valid URL')
], protect, updateProduct);



module.exports = router;