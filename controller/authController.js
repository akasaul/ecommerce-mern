const asyncHandler = require('express-async-handler')
const User = require('../model/User');
const {validationResult} = require('express-validator')
const jwt = require('jsonwebtoken');

const MAX_AGE = 60 * 60 * 24 * 7;

const createToken =  (id) => {
    const token = jwt.sign({ id }, process.env.TOKEN_SECRET, {  expiresIn: MAX_AGE });
    return token;
}

// sign up controller 
const signUp = asyncHandler (
    async (req, res, next) => {
    const { name, email, password, password2} = req.body;

    // Validation result 

    const errors = validationResult(req);

    // Check data fields 

    if(!name || !email || !password || !password2) {
        res.status(400);
        throw new Error('Please provide the required fields');
    }

    if(password !== password2) {
        res.status(400);
        throw new Error('Please password mismatch');
    }

    if(!errors.isEmpty()) {
        res.status(400);
        throw new Error(errors.array()[0].msg);
    }

    // register to database
    let user;

    try {
        user = await User.create({name, email, password});
        const token = createToken(user._id);
        res.cookie('gullitjwt', token, {httpOnly: true});
    } catch (err) {
        if(err.code === 11000) {
            throw new Error(err.keyValue.email + ' already exists');
        }
        throw new Error(err.message);
    }

    res.json(user);
});

// login controller 
const logIn = asyncHandler (
    async (req, res, next) => {
    const { email, password} = req.body;

    // Validation result 

    const errors = validationResult(req);

    // Check data fields 

    if(!email || !password ) {
        res.status(400);
        throw new Error('Please provide the required fields');
    }

    if(!errors.isEmpty()) {
        res.status(400);
        throw new Error(errors.array()[0].msg);
    }

    // register to database
    let user;

    try {
        user = await User.login(email, password);
        const token = createToken(user._id);
        res.cookie('gullitjwt', token, {httpOnly: true});
    } catch (err) {
        if(err.code === 11000) {
            throw new Error(err.keyValue.email + ' already exists');
        }
        throw new Error(err.message);
    }

    res.json(user);
});


module.exports = {
    logIn,
    signUp
};