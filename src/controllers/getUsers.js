const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')

const getAllUsers = async (req, res) => {
    console.log(req.body)
    try {
        const users = await User.find().select('-password');
        res.status(StatusCodes.OK).json({ users, count: users.length })

    } catch (err) {
        console.log(err);
    }
}


const getUser = async (req, res) => {
    console.log(req.body)
    try {
        const {

            params: { id: userId }
        } = req

        const user = await User.findOne({
            _id: userId,
        }).select('-password');
        if (!user) {
            throw new NotFoundError(`No user with id ${id}`)
        }
        res.status(StatusCodes.OK).json({ user })
    } catch (err) {
        console.log(err);
    }
}



module.exports = {
    getUser,
    getAllUsers
}