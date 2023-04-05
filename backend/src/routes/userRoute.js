const { Router } = require("express");
const { createUser, loginUser, handleRefreshToken, createAuthor } = require("../controller/userController");

const app = Router();

app.post("/signup", createUser)
app.post("/signupAuthor", createAuthor)
app.post("/login", loginUser)
app.get("resfreshToken", handleRefreshToken)

module.exports = app;