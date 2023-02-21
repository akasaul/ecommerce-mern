const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const app = express();
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');

app.use(express.json());

app.use('/auth', authRoutes);


app.use('/product', productRoutes);

// Error handler middleware 
app.use((error, req, res, next) => {
    if(!error.statusCode) {
        error.statusCode = 500;
    }
    res.json({msg: error.message})
})

// connect mongo db

mongoose.connect(process.env.DB, (err) => {
    if(err) {
        throw new Error('can\'t connect to the db');
    }
    app.listen(process.env.PORT, () => {
        console.log('connected at ' + process.env.PORT)
    })
})