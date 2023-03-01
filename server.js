const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const app = express();
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');

const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(cookieParser());

app.use(cors())

app.use('/auth', authRoutes);

app.use('/product', productRoutes);

app.use('/user', userRoutes);

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