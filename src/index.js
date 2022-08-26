const express = require("express");

const app = express();
const cors = require("cors")

const userRouter = require('./api/user')
const productRouter = require('./api/products')

app.use(express.json());

app.use(express.urlencoded({ extended: true }))

app.use(cors())

app.use("/api/auth", userRouter);
app.use("/api/product", productRouter);

module.exports = app;
