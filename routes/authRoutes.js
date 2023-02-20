const { logIn, signUp } = require('../controller/authController');
const {body} = require('express-validator')

const router = require('express').Router();

// login route 
router.post('/login',[
    body('email').isEmail().withMessage('Enter a valid email'),
    body('password').isLength({ min: 5 }).withMessage('Password should be more than 5 characters')
], logIn)

// signup route 
router.post('/signup', [
    body('name').isAlphanumeric().withMessage('Name Shouldn\'t contain characters'),
    body('email').isEmail().withMessage('Enter a valid email'),
    body('password').isLength({ min: 5 }).withMessage('Password should be more than 5 characters')
], signUp)

module.exports = router;