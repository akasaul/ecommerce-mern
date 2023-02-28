const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide name']
    },
    description: {
        type: String,
        defualt: 'No description'
    },
    price: {
        type: Number,
        required: [true, 'Please provide price']
    },
    // rating: {
    //     type: Number,
    //     default: 0
    // },
    rating: [
        {
            prodId: {
                type: mongoose.Schema.Types.ObjectId,
                required: [true, 'Please Insert Id'],
                ref: 'Product',
            },
            value: {
                type: Number,
                required: true
            },
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: 'User'
            }
        }
    ],    
    category: {
        type: String,
        enum: ['food', 'other', 'instrument', 'cloth', 'furniture', 'electronics'],
        default: 'other'
    },
    qty: {
        type: Number, 
        required: true
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    imageUrl: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Product', productSchema);