const mongoose= require('mongoose');

const OrderSchema = new mongoose.Schema(
    {
        products: [{
                _id: {
                    type: String,
                    required: true
                },
                title:{
                    type: String,
                    required: true
                },
                quantity: {
                    type: Number,
                    default: 1
                },
                price: {
                    type: Number,
                    required: true
                }
            }],
        subtotal: {
            type: Number,
            required: true, 
            default: 0
        },
        tax: {
            type: Number,
            default: function() {
                return this.subtotal * 0.0699
            }
        },
        total: {
            type: Number,
            default: function() {
                return this.subtotal + this.tax
            }
        },
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        email:{
            type: String,
            required: true,
            match: [
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                'Please provide a valid email',
            ]
        },
        address: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        zipCode: {
            type: Number,
            required: true
        },
        country: {
            type: String,
            required: true
        }, 
        cardHolder:{
            type: String,
            required: true
        },
        cardNumber: {
            type: Number,
            required: true
        },
        expirationMonth: {
            type: Number,
            required: true
        },
        expirationYear: {
            type: Number,
            required: true
        },
        ccv: {
            type: Number,
            required: true
        },
        createdBy: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
            required: [true, 'Please provide user']
        }
    },
    { timestamps: true }
)

// OrderSchema.virtual('subsubtotal').get(function () {
//     return for (let i = 0; i < this.products.price.length ; i++ ) {

//     }
// });

module.exports = mongoose.model('Order', OrderSchema)