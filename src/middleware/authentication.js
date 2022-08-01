require("dotenv").config()
const jwt = require("jsonwebtoken")
const User = require("../models/user.model")
const redis = require("../configs/redis")

const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET_KEY, function (err, decoded) {
      if (err) return reject("error", err)
      resolve(decoded)
    })
  })
}

module.exports = async (req, res, next) => {
  if (!req?.headers?.authorization)
    return res.status(400).send({ message: "bearer token not in header" })

  const bearerToken = req.headers.authorization

  if (!bearerToken || !bearerToken.startsWith("Bearer "))
    return res.status(400).send({ message: "bearer is not valid" })

  const token = bearerToken.split("Bearer ")[1].trim()

  let user
  try {
    user = await verifyToken(token)

    redis.get("Users", async (err, value) => {
      if (err) console.log(err)

      if (value) {
        let valueArr = JSON.parse(value)
        value = valueArr.find((e) => e === user.user._id)
        if (value) {
          return (req.user = value)
        } else {
          const valueUser = await User.findById(user.user._id).lean().exec()

          if (!valueUser) return res.status(400).send({ message: "User not exist" })
          
          redis.set('Users', JSON.stringify([...valueArr, valueUser]))
          
          req.user = valueUser
        }
      } else {
        const value = await User.findById(user.user._id).lean().exec()

        if (!value) return res.status(400).send({ message: "User not exist" })

        let valueArr = []

        valueArr.push(value)

        redis.set('Users', JSON.stringify(valueArr))

        req.user = value
      }
    })
  } catch (error) {
    return res.status(401).send({ message: "token is not valid" })
  }
  next()
}
