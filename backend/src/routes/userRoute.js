const { Router } = require("express");
const { createUser, loginUser } = require("../controller/userController");

const app = Router();

app.post("/signup", createUser)
app.post("/login", loginUser)

module.exports = app;