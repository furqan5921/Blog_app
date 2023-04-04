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
            const refreshToken = await generateRefreshToken(_id)
            const updateUser = await User.findOneAndUpdate(_id, {
                refreshToken
            },
                {
                    new: true
                })
        
            return res.status(200).send({
                message: "Login success",
                token: generateToken(_id, email),
                firstname,
                lastname,
                role,
                mobile,

            });
        }
        else {
            throw new Error("Password is Not Mathching")
        }
    } catch (err) {
        throw new Error(err.message)
    }

    return res.send("Invalid login");
})


module.exports = { createUser, loginUser }