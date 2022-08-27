const Product = require("../models/products.model")
const redis = require("../configs/redis")

const create = async (req, res) => {
  try {
    const product = await Product.create({
      ...req.body,
      productImgUrl: req.file?.location,
    })

    redis.get("Product", async (err, value) => {
      if (err) console.log(err)

      if (value) {
        value = JSON.parse(value)

        redis.set("Product", JSON.stringify([...value, product]))
      } else {
        value = await Product.find().lean().exec()

        redis.set("Product", JSON.stringify(value))
      }
    })

    redis.get("Brand", async (err, value) => {
      if (err) console.log(err)

      if (value) {
        value = JSON.parse(value)

        redis.set(
          "Brand",
          JSON.stringify({ ...value, products: [...value.products, product] })
        )
      }
    })

    res.status(201).send(product)
  } catch (error) {
    console.log(error.message)
    res.status(500).send(error.message)
  }
}

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id)

    redis.get("Product", async (err, fetchedPost) => {
      if (err) console.log(err)

      const products = await Product.find().lean().exec()
      redis.set("Product", JSON.stringify(products))
    })

    redis.get("Brand", async (err, value) => {
      if (err) console.log(err)

      if (value) {
        value = JSON.parse(value)

        const products = await Product.find()
          .select({ buyingPrice: 0 })
          .lean()
          .exec()

        redis.set("Brand", JSON.stringify({ ...value, products: products }))
      }
    })

    res.status(200).send(product)
  } catch (error) {
    console.log(error.message)
    res.status(500).send(error.message)
  }
}

module.exports = { create, deleteProduct }
