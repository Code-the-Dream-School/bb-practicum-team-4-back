const mongoose= require('mongoose');

const OrderSchema = new mongoose.Schema(
    {
        products: [{
                productId: {
                    type: String,
                    required: true
                },
                name:{
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
        bill: {
            type: Number,
            required: true, 
            default: 0
        },
        shippingInfo: {
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
                addressLine1: {
                    type: String,
                    required: true
                },
                addressLine2: {
                    type: String,
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
            },
        }, 
        paymentInfo: {
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
            }
        },
        createdBy: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
            required: [true, 'Please provide user']
        }
    },
    { timestamps: true }
)

module.exports = mongoose.model('Order', OrderSchema)