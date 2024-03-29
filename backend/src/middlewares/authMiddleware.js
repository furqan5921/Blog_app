const User = require("../models/userModel")
const asyncHandler = require("express-async-handler")
const jwt = require("jsonwebtoken")


const isAdmin = asyncHandler(async (req, res, next) => {
    const { email } = req.user
    const admin = await User.findOne({ email })

    if (admin.role !== "admin") {
        throw new Error("Not Authorized person")
    }
    else {
        next()
    }
})
const authMiddleware = asyncHandler(async (req, res, next) => {
    let token;

    if (req?.headers?.authorization?.startsWith("Bearer")) {

        token = req.headers.authorization.split(" ")[1]
        try {
            if (token) {
                const decoded = jwt.verify(token, process.env.JWT_SECRET)
                const user = await User.findById(decoded?.id)
                req.user = user
                next()

            }
        } catch (e) {

            throw new Error("Not Authorized token expired, login again")
        }
    }
    else {

        throw new Error("Invalid authorization")
    }
})
const isAuthor = asyncHandler(async (req, res, next) => {
    const { email } = req.user
    const author = await User.findOne({ email })

    if (author.role !== "author") {
        throw new Error("Not Authorized person")
    }
    else {
        next()
    }
})
const isAuthorOrAdmin = asyncHandler(async (req, res, next) => {

    try {

        const { email } = req.user

        const author = await User.findOne({ email })
        console.log(author.role)


        if (author.role == "author" || author.role == "admin") {
            
            next()
        }
        else {
            throw new Error("Not Authorized person")
        }
    } catch (e) {
        console.log(e.message)
    }

})
module.exports = { isAdmin, isAuthor, authMiddleware, isAuthorOrAdmin }