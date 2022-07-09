
const express = require("express");
const router = express.Router();
const { insertGoogleKeys, insertMongoString } = require("../controllers/keys");


router.route("/google")
  .post(insertGoogleKeys);

router.route("/mongodb")
  .post(insertMongoString);


module.exports = router;
