
const express = require("express");
const router = express.Router();
const {getAllTranscriptions, createTranscription, getTranscription, deleteTranscription} = require("../controllers/transcriptions");

router.route("/")
  .get(getAllTranscriptions)
  .post(createTranscription)

router.route("/:id")
  .get(getTranscription)
  .delete(deleteTranscription)

module.exports = router;
