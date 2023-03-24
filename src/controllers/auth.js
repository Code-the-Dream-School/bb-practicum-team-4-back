const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, UnauthenticatedError } = require('../errors')

const register = async (req, res) => {
    const user = await User.create({ ...req.body })
    const token = user.createJWT()
    res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token })
}

const login = async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        throw new BadRequestError('Please provide email and password')
    }
    const user = await User.findOne({ email })
    if (!user) {
        throw new UnauthenticatedError('Invalid Credentials')
    }
    const isPasswordCorrect = await user.comparePassword(password)
    if (!isPasswordCorrect) {
        throw new UnauthenticatedError('Invalid Credentials')
    }
    // compare password
    const token = user.createJWT()
    res.status(StatusCodes.OK).json({ user: { name: user.name }, token })
}

const removeUser = async (req, res) => {
    const { email } = req.body
    if (!email) {
        throw new BadRequestError('Please provide email')
    }

    const user = await User.findOne({ email })
    if (!user) {
        throw new UnauthenticatedError('Invalid Credentials')
    }
    console.log(user);
    const deleteUser = await User.findByIdAndRemove({
        _id: user.id,
    })
    if (!user) {
        throw new NotFoundError(`No user with email ${email}`)
    }
    res.status(StatusCodes.OK).json({ msg: "The entry was deleted." })
}

const updateUser = async (req, res) => {
    console.log(req.body);
    const { emailToEdit, name, username, email, password } = req.body
    console.log("eamilToEdit", emailToEdit);

    if (!emailToEdit) {
        throw new BadRequestError('Please provide email')
    }

    const user = await User.findOne({ email: emailToEdit })
    if (!user) {
        console.log("user not found")
        throw new UnauthenticatedError('Invalid Credentials')
    }

    if (name === '' && username === '' && email === '' && password === '') {
        throw new BadRequestError('Provide values to name, username, email, password')
    }
    console.log("okay");
    const updatedUser = await User.findByIdAndUpdate(
        { _id: user.id },
        req.body,
        { new: true, runValidators: true }
    )

    res.status(StatusCodes.OK).json({ updatedUser })
}

module.exports = {
    register,
    login,
    removeUser,
    updateUser
}