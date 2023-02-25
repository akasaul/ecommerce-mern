const router = require('express').Router();
const userController = require('../controller/userController');
const protect = require('../middleware/protect');

const {addToCart, removeFromCart, toggleFavorite} = userController;

router.post('/cart', protect, addToCart).delete('/cart/:id', protect, removeFromCart);

router.post('/favs', protect, toggleFavorite);


module.exports = router;