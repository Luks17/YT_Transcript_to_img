
const { Schema, model } = require("mongoose");


const imagesSchema = new Schema({
  videoID: {
    type: "string",
    required: [true, "Video ID is required"],
    unique: true,
  },
  imagesURLs: {
    type: "array",
    default: new Array(),
  },
}) 

module.exports = model("videoImages", imagesSchema);
