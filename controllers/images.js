
const VideoImages = require("../db/images_model");
const { getImageURL } = require("../lib/image_downloader");


const getAllVideoImages = async (req, res) => {
  try{
    const videoImages = await VideoImages.find();
    res.status(200).json(videoImages);
  }
  catch(error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
}

const getVideoImages = async (req, res) => {
  if(!req.params.videoId)
    return res.status(401).json({msg: "No video ID provided at parameters"});

  const videoID = req.params.videoId;

  try {
    const videoImages = await VideoImages.findOne({videoID: videoID});
    if(videoImages == null) {
      return res.status(404).json({ msg: "No videoImages instance found with the provided id" });
    }
    res.status(200).json(videoImages);  
  } 
  catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
}

const createVideoImages = async (req, res) => {
  if(!req.body.videoID)
    return res.status(401).json({msg: "No video ID provided at body"});
  if(!req.body.transcription)
    return res.status(401).json({ msg: "No video transcription provided" });
  
  const videoID = req.body.videoID;
  const transcription = req.body.transcription.split("\n");
  const urls = new Array();

  transcription.forEach(async line => {
    const url = await getImageURL(line);
    urls.push(url);
  });

  const videoImages = new VideoImages({ videoID: videoID, imagesURLs: urls });

  try{
    await videoImages.save();
    res.status(201).json(videoImages);
  }
  catch(error) {
    console.log(error);
    res.status(401).json({ msg: error });
  }
}

const removeVideoImages = async (req, res) => {
  if(!req.params.videoId)
    return res.status(401).json({msg: "No video ID provided at parameters"});
  
  const videoID = req.params.videoId;

  try {
    const videoImages = await VideoImages.findOneAndDelete({ videoID: videoID });

    if(videoImages == null) {
      return res.status(404).json({ msg: "No videoImages instance contains the videoID" });
    }
    res.status(200).json(videoImages);
  } 
  catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
}


module.exports = { getAllVideoImages, getVideoImages, createVideoImages, removeVideoImages };
