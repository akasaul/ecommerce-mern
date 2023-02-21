const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../model/User');
const {Schema} = require('mongoose');

module.exports = asyncHandler (
    async (req, res, next) => {

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        
        const token = req.headers.authorization.split(' ')[2];

        await jwt.verify(token, process.env.TOKEN_SECRET, async (err, decoded) => {
            if(err) {
                res.status(401);
                throw new Error('Not Authorized');
            }
            req.user = await User.findById(decoded.id);
        });

    } else {
        res.status(401);
        throw new Error('Not Authorized');  
    }
    next();
});