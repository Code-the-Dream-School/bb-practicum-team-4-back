const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    productId: {
        type: String,
        unique: [true, 'That productId already exists'],
        required: [true, 'Please provide ProductID'],
        maxlength: 50,
        minlength: 1,
    },
    productName: {
        type: String,
        required: [true, 'Please provide Product Name'],
        maxlength: 50,
        minlength: 3,
    },
    productPrice: {
        type: Number,
        required: [true, ' Please provide Product Price!'],
    }
})


module.exports = mongoose.model('Product', ProductSchema)