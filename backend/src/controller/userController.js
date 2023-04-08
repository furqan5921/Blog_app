const User = require("../models/userModel")
const argon2 = require("argon2")
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const { generateToken } = require("../config/generateToken");
const { generateRefreshToken } = require("../config/generateRefreshToken");
//Create a new User
const createUser = asyncHandler(async (req, res) => {
    const { email, firstname, lastname, password } = req.body;

    const user = await User.findOne({ email })
    console.log(user)
    if (!user) {
        try {
            const hash = await argon2.hash(password);

            const newUser = await User.create({ email, firstname, lastname, password: hash });

            return res.status(200).send({
                msg: "User Created successfully",
                success: true
            })
        } catch (e) {
            return res.status(404).send({
                msg: e.message,
                success: false
            })
        }
    }
    else {
        throw new Error("User Already Exists")
    }
})
const createAuthor = asyncHandler(async (req, res) => {
    const { email, firstname, lastname, password, role } = req.body;

    const user = await User.findOne({ email })
    if (!user) {
        try {
            const hash = await argon2.hash(password);

            const newAuthor = await User.create({ email, firstname, lastname, password: hash, role });

            return res.status(200).send({
                msg: "Author Created successfully",
                success: true
            })
        } catch (e) {
            return res.status(404).send({
                msg: e.message,
                success: false
            })
        }
    }
    else {
        throw new Error("User Already Exists")
    }
})

//Login a new user
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });


        if (!user) {
            throw new Error("User Not Found")
        }
        const validatePassword = await argon2.verify(user.password, password);
        if (validatePassword) {
            const { _id, firstname, lastname, email, role } = user;
            return res.status(200).send({
                message: "Login success",
                token: generateToken(_id, email, role, firstname, lastname),
                refreshToken: generateRefreshToken(_id),
                firstname,
                lastname,
                role,
                id: _id
            });
        }
        else {
            throw new Error("Password is Not Matching")
        }
    } catch (err) {
        throw new Error(err.message)
    }
})

const handleRefreshToken = asyncHandler(async (req, res) => {

    const refreshToken = req.headers.authorization.split(" ")[1]
    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET)
    if (decoded == jwt.TokenExpiredError) {
        return res.status(401).json({ message: 'Token expired' });
    }
    const user = await User.findById(decoded?.id)
    if (user) {
        const accessToken = generateToken(user?._id, user?.email, user?.role, user?.firstname, user?.lastname)
        res.status(200).send({ accessToken })
    }
    else {
        throw new Error('Token is not valid')
    }
})

module.exports = { createUser, loginUser, handleRefreshToken, createAuthor }