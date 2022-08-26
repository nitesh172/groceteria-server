const mongoose = require("mongoose")

var Schema = mongoose.Schema

var customizationSchema = new Schema(
  {
    customizationID: {
      type: Number,
      required: true,
    },
    customizationType: {
      type: String,
      required: true
    },
    customizationName: {
      type: String,
      required: true
    },
    customizationObject: {
      type: Object,
      required: true
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
)

var Customization = mongoose.model("customization", customizationSchema)

module.exports = Customization
