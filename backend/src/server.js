require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { notFound, errorHandler } = require('./middlewares/errorHandler');
const userRouter = require("./routes/userRoute")
const commentRouter = require("./routes/commentRoute");
const blogRouter = require("./routes/blogRoute");
const DBConnection = require("./config/DBConnet")
const PORT = 8080


const app = express();

DBConnection();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/users", userRouter)
app.use("/blog", blogRouter)
app.use("/comments", commentRouter)
app.get("/", (req, res) => {
    res.send('Hello World')
})
app.use(notFound)
app.use(errorHandler)


app.listen(PORT, () => {
    console.log('server listening on port 8080')
});