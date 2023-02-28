const router = require('express').Router();
const userController = require('../controller/userController');
const protect = require('../middleware/protect');

const {addToCart, removeFromCart, toggleFavorite, getFavs, getUser, getMe} = userController;

router.post('/cart', protect, addToCart).delete('/cart/:id', protect, removeFromCart);

router.route('/favs').post(protect, toggleFavorite).get(protect, getFavs);

router.get('/profile/me', protect, getMe);

router.get('/profiles/:userId', getUser);

module.exports = router;