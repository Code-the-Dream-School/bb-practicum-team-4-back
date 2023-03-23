const Payment = require('../models/Payment')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError, NotFoundError} = require('../errors')

const createPaymentMethod = async (req, res) => {
    req.body.createdBy = req.user.userId
    const payment = await Payment.create(req.body)
    res.status(StatusCodes.CREATED).json({payment})
}

const getAllPaymentMethods = async (req, res) => {
    const paymentMethods = await Payment.find({createdBy:req.user.userId}).sort('createdAt')
    res.status(StatusCodes.OK).json({paymentMethods})
}
const getPaymentMethod = async (req, res) => {
    const {
        user: {userId}, 
        params: {id: paymentId}
    }= req
    const payment = await Payment.findOne({
        _id: paymentId, createdBy: userId
    })
    if(!payment) {
        throw new NotFoundError('This payment method was not found')
    }
    res.status(StatusCodes.OK).json({payment})
}
const deletePaymentMethod = async (req, res) => {
    const {
        user: {userId}, 
        params: {id: paymentId}
    }= req
    const payment = await Payment.findByIdAndRemove({
        _id: paymentId, createdBy: userId
    })
    if(!payment) {
        throw new NotFoundError('This payment method was not found.')
    }
    res.status(StatusCodes.OK).json('The payment method has been removed.')
}