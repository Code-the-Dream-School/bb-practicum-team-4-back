const Order = require('../models/Order');
const {StatusCodes} = require('http-status-codes')
const {NotFoundError, BadRequestError} = require('../errors')

const createOrder = async (req, res) => {
    req.body.createdBy = req.user.userId
    const {products} = req.body
    if(!products) {
        throw new BadRequestError('Please provide product(s) information.')
    }
    const order = await Order.create(req.body)
    res.status(StatusCodes.CREATED).json({order})
}
const getAllOrders = async (req, res) => {
    const {params: {id: userId}} = req
    const orders = await Order.find({createdBy: req.user.userId}).sort('createdAt')
    res.status(StatusCodes.OK).json({orders, count:orders.length})
}
const getOrder = async (req, res) => {
    const {
        user: {userId},
        params: {id: orderId}
    } = req

    const order = await Order.findOne({
        _id: orderId, createdBy: userId
    })
    if(!order) {
        throw new NotFoundError(`The order with the id: ${orderId} was not found.`)
    }
    res.status(StatusCodes.OK).json({order})
}

const deleteOrder = async (req, res) => {
    const {
        user: {userId}, 
        params: {id: orderId}
    } = req

    const order = await Order.findByIdAndRemove({
        _id: orderId, createdBy: userId
    })
    if (!order) {
        throw new NotFoundError(`The order with the id: ${orderId} was not found.`)
    }
    res.status(StatusCodes.OK).json('The order has been removed')
}

module.exports = {
    createOrder,
    getAllOrders, 
    getOrder, 
    deleteOrder,
}