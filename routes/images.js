
const express = require("express");
const router = express.Router();
const { getAllVideoImages, getVideoImages, createVideoImages, removeVideoImages } = require("../controllers/images");

router.route("/")
  .get(getAllVideoImages)
  .post(createVideoImages);

router.route("/:videoId")
  .get(getVideoImages)
  .delete(removeVideoImages);

module.exports = router;
