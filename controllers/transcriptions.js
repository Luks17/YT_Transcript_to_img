
const Transcript = require("../db/transcriptionModel");


const getAllTranscriptions = async (req, res) => {
  res.status(200).json({msg: "All transcriptios"});
}

const createTranscription = async (req, res) => {
  res.status(201).json({msg: "Creating transcription"});
}

const getTranscription = async (req, res) => {
  res.status(200).json({msg: "Transcription"});
}

const deleteTranscription = async (req, res) => {
  res.status(200).json({msg: "Deleting transcription"});
}

module.exports = {getAllTranscriptions, createTranscription, getTranscription, deleteTranscription};
