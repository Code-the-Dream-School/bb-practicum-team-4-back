const mongoose= require('mongoose');

const OrderSchema = new mongoose.Schema(
    {
        // userId: {
        //     type: String,
        //     required: true,
        //     ref:'User'
        // },
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
        createdBy: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
            required: [true, 'Please provide user']
        }
    },
    { timestamps: true }
)

module.exports = mongoose.model('Order', OrderSchema)