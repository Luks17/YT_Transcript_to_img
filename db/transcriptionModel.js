
const {Schema, model} = require("mongoose");


const transcriptSchema = new Schema({
  videoURL: {
    type: String,
    required: [true, "Video URL is required"],
  },
  transcription: {
    type: String,
    default: "",
  },
}) 

module.exports = model("Transcript", transcriptSchema);
