require("dotenv").config()
const jwt = require("jsonwebtoken")
const User = require("../src/models/user.model")

const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET_KEY, function (err, decoded) {
      if (err) return reject("error",err)
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
    const fetchedUser = await User.findById(user.user._id).lean().exec()

    if(!fetchedUser) return res.status(400).send({ message: "User not exist" })
    
    req.user = fetchedUser
  } catch (error) {
    return res.status(401).send({ message: "token is not valid" })
  }

  next()
}
