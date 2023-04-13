const mongoose = require('mongoose')

const PaymentSchema = new mongoose.Schema(
    {
        // userId: {
        //     type: String,
        //     required: true, 
        // },
        card: [{
            nameOnCard:{
                type: String,
                required: true
            },
            cardNumber: {
                type: String,/// Number type wasn't working I assume due to the spaces in between the numbers
            },
            expirationDate: {
                type: Date, //date type needs to be fixed to a mm/yyyy format
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