const { merge } = require("lodash")
const Customization = require("../models/customization")

const createCustomization = async (req, res) => {
  try {
    const customization = await Customization.create(req.body)

    res.status(201).send(customization)
  } catch (error) {
    console.log(error.message)
    res.status(500).send(error.message)
  }
}


const setup = async (req, res) => {
  try {

    let customization = {}
    
    const response = await Customization.find().lean().exec()

    response.forEach(element => {
        merge(customization, element.customizationObject)
    })
    
    res.status(200).send({BrandID: 101, features: customization})
    
  } catch (error) {
    console.log(error.message)
    res.status(500).send(error.message)
  }
}

module.exports = { createCustomization, setup }
