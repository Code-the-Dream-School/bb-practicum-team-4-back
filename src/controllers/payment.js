const Payment = require('../models/Payment')
const {StatusCodes} = require('http-status-codes')
const {NotFoundError,BadRequestError} = require('../errors')

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
    } = req
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
const updatePaymentMethod = async (req, res) => {
    const {
        body: {nameOnCard, cardNumber, expirationDate, securityCode, billingAddress},
        user: {userId}, 
        params: {id: paymentId}
    } = req

    if (nameOnCard === '') {
        throw new BadRequestError('The name field cannot be empty.')
    } else if (cardNumber === '') {
        throw new BadRequestError('The card number field cannot be empty.')
    } else if (expirationDate === '') {
        throw new BadRequestError('Please enter the expiration date.')
    } else if (securityCode === '') {
        throw new BadRequestError('Please enter the security code.')
    } else if (billingAddress === '') {
        throw new BadRequestError('The billing address fields cannot be empty.')
    }

    const payment = await Payment.findByIdAndUpdate(
        { _id: paymentId, createdBy: userId}, 
        req.body, 
        {new: true, runValidators: true}
    )

    if(!payment) {
        throw new NotFoundError('This payment method was not found.')
    }
    res.status(StatusCodes.OK).json({payment})
}

module.exports = {
    createPaymentMethod, 
    getAllPaymentMethods, 
    getPaymentMethod,
    deletePaymentMethod, 
    updatePaymentMethod
}