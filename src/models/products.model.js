const mongoose = require("mongoose")

var Schema = mongoose.Schema

var productSchema = new Schema(
  {
    productID: {
        type: Number,
        required: true
    },
    productName: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    subCategory: {
        type: String,
        required: true
    },
    buyingPrice: {
        type: String,
        required: true
    },
    mrp: {
        type: String,
        required: true
    },
    sellingPrice: {
        type: String,
        required: true
    },
    qtyLimit: {
        type: String,
        required: true
    },
    stock: {
        type: String,
        required: true
    },
    unit: {
        type: String,
        required: true
    },
    productImgUrl: {
        type: String,
        required: true
    },
    productDescription:{
        type: String,
        required: true
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
)

var Product = mongoose.model("product", productSchema)

module.exports = Product
