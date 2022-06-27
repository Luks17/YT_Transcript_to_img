
const Transcript = require("../db/transcriptionModel");
const downloadAndScrap = require("../utils/downloadAndScrap");

const getAllTranscriptions = async (req, res) => {
  res.status(200).json({msg: "All transcriptios"});
}

const createTranscription = async (req, res) => {
  if(!req.body.videoURL) {
    console.log("Invalid URL provided");
    return res.status(401).json({msg: "Invalid URL provided"});
  }

  const url = req.body.videoURL;
  const transcription = await downloadAndScrap(url);
  const transcript = new Transcript({videoURL: url, transcription: transcription});

  try {
    await transcript.save();
    res.status(201).json(transcript);
  }
  catch(error) {
    console.log(error);
    res.status(401).json({msg: error});
  }
}

const getTranscription = async (req, res) => {
  res.status(200).json({msg: "Transcription"});
}

const deleteTranscription = async (req, res) => {
  res.status(200).json({msg: "Deleting transcription"});
}

module.exports = {getAllTranscriptions, createTranscription, getTranscription, deleteTranscription};
