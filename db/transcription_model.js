
const {Schema, model} = require("mongoose");


const transcriptSchema = new Schema({
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
