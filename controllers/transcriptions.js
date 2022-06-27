
const Transcript = require("../db/transcriptionModel");
const downloadAndScrap = require("../utils/downloadAndScrap");

const getAllTranscriptions = async (req, res) => {
  try{
    const transcripts = await Transcript.find();
    res.status(200).json(transcripts);
  }
  catch(error) {
    console.log(error);
    res.status(404).json({ msg: error });
  }
}

const createTranscription = async (req, res) => {
  let transcription;
  if(!req.body.videoURL) {
    console.log("Invalid URL provided");
    return res.status(401).json({msg: "Invalid URL provided"});
  }

  const url = req.body.videoURL;

  try {
    transcription = await downloadAndScrap(url);
  }
  catch(error) {
    console.log(error);
    return res.status(500).json({ msg: error });
  }

  const transcript = new Transcript({videoURL: url, transcription: transcription});

  try {
    await transcript.save();
    res.status(201).json(transcript);
  }
  catch(error) {
    console.log(error);
    res.status(401).json({ msg: error });
  }
}

const getTranscription = async (req, res) => {
  try {
    const transcriptId = req.params.id;
    const transcript = await Transcript.findOne({ _id: transcriptId });

    if(transcript == null) {
      return res.status(404).json({ msg: "No transcription matches the ID" });
    }
    res.status(200).json(transcript);
  }
  catch(error) {
    res.status(500).json({ msg: "Invalid ID" });
  }
}

const deleteTranscription = async (req, res) => {
  try {
    const transcriptId = req.params.id;
    const transcript = await Transcript.findOneAndDelete({ _id: transcriptId });

    if(transcript == null) {
      return res.status(404).json({ msg: "No transcription matches the ID" });
    }
    res.status(200).json(transcript);
  }
  catch(error) {
    res.status(500).json({ msg: "Invalid ID" });
  }
}

module.exports = {getAllTranscriptions, createTranscription, getTranscription, deleteTranscription};
