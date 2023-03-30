const Product = require('../models/Product')
const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')

const getAllProducts = async (req, res) => {
    const products = await Product.find()
    res.status(StatusCodes.OK).json({ products, count: products.length })
}

const createProduct = async (req, res) => {
    res.send('createProduct function')

}

const getProduct = async (req, res) => {
    res.send('getProduct function')
}

const deleteProduct = async (req, res) => {
    res.send('deleteProduct function')
}

module.exports = {
    getAllProducts,
    createProduct,
    getProduct,
    deleteProduct

}