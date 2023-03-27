const mongoose = require('mongoose')

const PaymentSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true, 
        },
        card: [{
            nameOnCard:{
                type: String,
                required: true
            },
            cardNumber: {
                type: Number,
            },
            expirationDate: {
                type: Number,
                required: true
            },
            securityCode: {
                type: Number,
                required: true
            }
        }],
        billingAddress: {
            type:Object,
            required:true
        },
        createdBy: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
            required: [true, 'Please provide user']
        }
    },
    { timestamps: true }
)

module.exports = mongoose.model('Payment', PaymentSchema);