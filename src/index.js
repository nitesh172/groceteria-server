const express = require("express")

const app = express()
const cors = require("cors")

const userRouter = require("./Routers/user.router")
const productRouter = require("./Routers/products.router")
const brandRouter = require('./Routers/brand.router')

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

app.use(cors())

app.use("/auth", userRouter)
app.use("/brand", brandRouter)
app.use("/product", productRouter)

module.exports = app
