const asyncHandler = require('express-async-handler')
const User = require('../model/User');
const {validationResult} = require('express-validator')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

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

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    try {
        const token = createToken(email);
        user = await User.create({name, email, password: hashedPassword, token});
        res.cookie('gullitjwt', token, {httpOnly: true});
        res.json({name: user.name, email: user.email, token});
    } catch (err) {
        if(err.code === 11000) {
            res.status(400);
            throw new Error(err.keyValue.email + ' already exists');
        }
        res.status(400);
        throw new Error(err.message);
    }

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

    let user;

    try {
        const token = createToken(email);
        user = await User.login(email, password);
        res.cookie('gullitjwt', token, {httpOnly: true});
        res.json({name: user.name, email: user.email, token: user.token});
    } catch (err) {
        if(err.code === 11000) {
            throw new Error(err.keyValue.email + ' already exists');
        }
        throw new Error(err.message);
    }   
});


module.exports = {
    logIn,
    signUp
};