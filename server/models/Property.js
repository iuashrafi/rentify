const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: { type: String, required: true },
    address: { type: String, required: true },
    photos: [String],
    description: String,
    perks: [String],
    price: Number,
    beds: Number,
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

const PropertyModel = mongoose.model("Property", propertySchema);

module.exports = PropertyModel;
