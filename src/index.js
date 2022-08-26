const express = require("express");

const app = express();
const cors = require("cors")

const userRouter = require('./Routers/user.router')
const productRouter = require('./Routers/products.router')

app.use(express.json());

app.use(express.urlencoded({ extended: true }))

app.use(cors())

app.use("/auth", userRouter);
app.use("/product", productRouter);

module.exports = app;
