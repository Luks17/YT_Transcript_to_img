
const {Schema, model} = require("mongoose");


const transcriptSchema = new Schema({
  videoTitle: {
    type: "string",
    required: [true, "Video Title is required"],
  },
  videoURL: {
    type: "string",
    required: [true, "Video URL is required"],
    unique: true,
  },
  transcription: {
    type: "string",
    default: "",
  },
  imagesURLs: {
    type: "array",
    default: new Array(),
  },
}) 

module.exports = model("Transcript", transcriptSchema);
