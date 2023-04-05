const jwt = require("jsonwebtoken")
const generateToken = (id, email, role, firstname, lastname) => {

    return jwt.sign({ id, email, role, firstname, lastname }, process.env.JWT_SECRET, {
        expiresIn: "1d"
    });
}

module.exports = { generateToken }