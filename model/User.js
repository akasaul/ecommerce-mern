const mongoose = require('mongoose')
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please Insert Name']
    },
    email: {
        type: String,
        required: [true, 'Please Insert Email'],
        unique: [true, 'Email already exists']
    },
    password: {
        type: String,
        required: [true, 'Please Insert Password'],
    },
    cart: [
        {
            prodId: {
                type: mongoose.Schema.Types.ObjectId,
                required: [true, 'Please Insert Id'],
                ref: 'Product',
            },
            qty: {
                type: Number,
                required: true
            }
        }
    ],
    favs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            required: [true, 'Please Insert Id'],
            ref: 'Product',
        }
    ]
})

// fire a function before doc saved to db
userSchema.pre('save',  async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next(); 
})

//login user
userSchema.statics.login = async function (email, password) {
    const user = await this.findOne({email: email});
    
    if(user) {
        if(await bcrypt.compare(password, user.password)) {
            return user;
        } 
        throw new Error('password not correct');
    } 
    throw new Error('User not found');
}

module.exports = mongoose.model('User', userSchema);