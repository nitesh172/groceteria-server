const mongoose = require("mongoose");

var Schema = mongoose.Schema;

var SubscriptionSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      max: 13,
    },
    createdAt: {type: Date, default: Date.now, index: {expires: 259200}}
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

var Subscription = mongoose.model("Subscription", SubscriptionSchema);

module.exports = Subscription
// 259200
