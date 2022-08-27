const Product = require('../models/products.model')

const create = async (req, res) => {
  try {

    const product = await Product.create({...req.body, productImgUrl: req.file?.location})
    
    res.status(201).send(product)
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
};

module.exports = { create };
