
const Transcript = require("../db/transcription_model");
const downloadAndScrap = require("../lib/download_and_scrap");
const { getImageURL } = require("../lib/image_downloader");
const { lightTranscript } = require("../lib/light_transcript");

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
  if(!req.body.videoURL)
    return res.status(400).json({msg: "Invalid URL provided"});

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
    res.status(422).json({ msg: error });
  }
}

// This function does not need a body. However, you can optionally use the lightSearch boolean to save google search quotas
const putVideoImages = async (req, res) => {
  const transcriptId = req.params.id;
  const lightSearch = req.body.lightSearch;
  const urls = new Array();
  let transcription, body;

  try{
    body = (await Transcript.findOne({ _id: transcriptId })).toObject();
    transcription = body.transcription;

    transcription = transcription.split("\n"); // creates an array element for each line in string
    if(lightSearch)
      transcription = lightTranscript(transcription); // reduces array size by joining lines in pairs
  }
  catch(error) {
    console.log(error);
    return res.status(404).json({ msg: "No transcript matching the transcript ID was found" });
  }

  try{
    for(let i in transcription) {
      const url = await getImageURL(transcription[i]);
      urls.push(url);
    }
    body.imagesURLs = urls;

    Transcript.findOneAndReplace({ _id: transcriptId }, body, {
      new: true,
      runValidators: true,
    })
    .then(newTranscription => res.status(200).json(newTranscription))
    .catch(error => {
      console.log(error);
      return res.status(404).json({ msg: "No transcript matching the transcript ID was found." });
    });
  }
  catch(error) {
    console.log(error);
    res.status(500).json({ msg: error });
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

module.exports = {getAllTranscriptions, createTranscription, putVideoImages, getTranscription, deleteTranscription};
