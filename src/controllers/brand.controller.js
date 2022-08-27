const { merge } = require("lodash")
const Customization = require("../models/customization.model")
const Product = require("../models/products.model")
const redis = require("../configs/redis")

const createCustomization = async (req, res) => {
  try {
    const customization = await Customization.create(req.body)

    redis.get("Customization", async (err, value) => {
      if (err) console.log(err)

      if (value) {
        value = JSON.parse(value)

        redis.set("Customization", JSON.stringify([...value, customization]))
      } else {
        value = await Customization.find().lean().exec()

        redis.set("Customization", JSON.stringify(value))
      }
    })

    redis.get("Brand", async (err, value) => {
      if (err) console.log(err)

      if (value) {
        value = JSON.parse(value)

        let featuresArr = value.features

        merge(featuresArr, customization.customizationObject)

        redis.set(
          "Brand",
          JSON.stringify({ ...value, features: featuresArr})
        )
      }
    })

    res.status(201).send(customization)
  } catch (error) {
    console.log(error.message)
    res.status(500).send(error.message)
  }
}

const setup = async (req, res) => {
  try {
    redis.get("Brand", async (err, value) => {
      if (err) console.log(err)

      if (value) {
        value = JSON.parse(value)

        res.status(200).send(value)
      } else {
        try {
          var customization = {}

          const customizations = await Customization.find().lean().exec()

          customizations.forEach((element) => {
            merge(customization, element.customizationObject)
          })

          const products = await Product.find()
            .select({ buyingPrice: 0 })
            .lean()
            .exec()

          redis.set(
            "Brand",
            JSON.stringify({
              BrandID: 101,
              features: customization,
              products: products,
            })
          )

          res.status(200).send({
            BrandID: 101,
            features: customization,
            products: products,
          })
        } catch (err) {
          res.status(500).send(err.message)
        }
      }
    })
  } catch (error) {
    console.log(error.message)
    res.status(500).send(error.message)
  }
}

module.exports = { createCustomization, setup }
