const Product = require('../models/Product')
const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find()
        res.status(StatusCodes.OK).json({ products, count: products.length })

    } catch (err) {
        console.log(err);
    }
}

const createProduct = async (req, res) => {
    console.log('*** CREATE PRODUCT *** ')
    console.log(req.body)
    try {
        const product = await Product.create(req.body)
        res.status(StatusCodes.CREATED).json({ product })
    } catch (err) {
        console.log(err);
    }
}

const getProduct = async (req, res) => {
    try {
        const {

            params: { id: productId }
        } = req

        const product = await Product.findOne({
            _id: productId,
        })
        if (!product) {
            throw new NotFoundError(`No link with id ${id}`)
        }
        res.status(StatusCodes.OK).json({ product })
    } catch (err) {
        console.log(err);
    }
}

const deleteProduct = async (req, res) => {
    try {

        const {
            // user: { userId },
            params: { id: productId }
        } = req
        const product = await Product.findByIdAndRemove({
            _id: productId
        })
        if (!product) {
            throw new NotFoundError('Product not found.')
        }
        res.status(StatusCodes.OK).json('Product removed.')
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    getAllProducts,
    createProduct,
    getProduct,
    deleteProduct

}