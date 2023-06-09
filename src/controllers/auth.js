const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, UnauthenticatedError, CustomAPIError } = require('../errors')

const register = async (req, res) => {

    let errMsg = "";
    try {
        const { name, email, password } = req.body
        if (!name) {
            console.log("***** Provide Name  *****")
            errMsg += " Provide Name, "
            // throw new Exception(" Name ");
            // res.status(StatusCodes.BAD_REQUEST).json({ error: "***** Erorr: Provide Name  *****" })
        }
        if (!password) {
            console.log("***** Provide Password  *****")
            errMsg += " Provide Password, "
            // res.status(StatusCodes.BAD_REQUEST).json({ error: "***** Erorr: Provide Password  *****" })
        }
        if (!email) {
            // throw new BadRequestError('Please provide Email')
            console.log("***** Provide Email  *****")
            errMsg += " Provide Email, "
            throw new Exception(errMsg);
            // throw new Exception("Email ");
            // res.status(StatusCodes.BAD_REQUEST).json({ error: "***** Erorr: Provide Email  *****" })
        }
        const userByEmail = await User.findOne({ email }).select('-username');
        if (userByEmail) {
            // throw new BadRequestError('Email already exist, use different one')
            console.log("***** Email already exist *****")
            errMsg += " Email already exist, "
            throw new Exception(errMsg);
            // res.status(StatusCodes.BAD_REQUEST).json({ error: "***** Erorr: Email already exist, use different one or login *****" })
        }
        console.log('REGISTERING USER NOW !!')
        const user = await User.create({ name: req.body.name, email: req.body.email, password: req.body.password })
        const token = user.createJWT()

        console.log("*****  " + user.name + " REGISTERED!  *****")
        res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token })



    } catch (err) {
        // console.log(err)
        res.status(StatusCodes.BAD_REQUEST).json({ error: errMsg })
    }



}

const login = async (req, res) => {

    try {
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
        res.status(StatusCodes.OK).json({ user: { name: user.name, email: user.email, id: user._id }, token })
    } catch (error) {
        console.log(error)
        res.status(StatusCodes.UNAUTHORIZED).json({ error: "401 Unauthorized - invalid credentials." })
    }
}

const removeUser = async (req, res) => {
    try {
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
    } catch (error) {
        console.log(error)
    }
}

const updateUser = async (req, res) => {
    try {
        const { emailToEdit, name, email, password } = req.body
        console.log("eamilToEdit", emailToEdit);

        if (!emailToEdit) {
            throw new BadRequestError('Please provide email')
        }

        const user = await User.findOne({ email: emailToEdit })
        if (!user) {
            console.log("user not found")
            throw new UnauthenticatedError('Invalid Credentials')
        }

        if (name === '' && email === '' && password === '') {
            throw new BadRequestError('Provide values to name, email, password')
        }
        console.log("okay");
        const updatedUser = await User.findByIdAndUpdate(
            { _id: user.id },
            req.body,
            { new: true, runValidators: true }
        )

        res.status(StatusCodes.OK).json({ updatedUser })
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    register,
    login,
    removeUser,
    updateUser
}