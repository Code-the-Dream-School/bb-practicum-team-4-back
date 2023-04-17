const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please provide Product Title'],
        maxlength: 50,
        minlength: 3,
    },
    category: {
        type: String,
        required: [true, 'Please provide Product Category'],
        maxlength: 50,
        minlength: 3,
    },
    description: {
        type: String,
        required: [true, 'Please provide Product Description'],
        maxlength: 350,
        minlength: 3,
    },
    price: {
        type: Number,
        required: [true, ' Please provide Product Price'],
    },
    img: {
        type: String,
        required: [true, 'Please provide Product Image URL'],
        maxlength: 300,
        minlength: 10,
    },
})


module.exports = mongoose.model('Product', ProductSchema)