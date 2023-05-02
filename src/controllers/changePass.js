const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, UnauthenticatedError, NotFoundError } = require('../errors')

const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const changePassFunction = async (req, res) => {
    try {
        console.log(req.body);
        const { email, newPassword } = req.body

        if (!email) {
            throw new BadRequestError('Please provide user email')
        }

        const user = await User.findOne({ email: email })
        if (!user) {
            console.log("user not found")
            throw new NotFoundError('User with that email address was not found')
        }

        if (email === '' && newPassword === '') {
            throw new BadRequestError('Provide values to name, username, email, password')
        }
        console.log("okay");
        // Password encryption
        const salt = await bcrypt.genSalt(10)
        const encPassword = await bcrypt.hash(newPassword, salt)

        const updatedUser = await User.findByIdAndUpdate(
            { _id: user.id, },
            {
                password: encPassword
            },
            { new: true, runValidators: true }

        )

        res.status(StatusCodes.OK).json({ msg: "Password changed successfully" })
    } catch (error) {
        console.log(error)
    }
}


module.exports = {
    changePassFunction

}