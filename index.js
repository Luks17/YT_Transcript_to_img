
require("dotenv").config(); // use .env to easily setup your environment variables
const express = require("express");
const app = express();
const connectToDB = require("./db/connect");
const transcriptions = require("./routes/transcriptions");
const videoImages = require("./routes/images");
const keys = require("./routes/keys");

var port = 5000;

//middleware
app.use(express.static("./public"));
app.use(express.json());

//routes
app.use("/api/transcriptions", transcriptions);
app.use("/api/videoImages", videoImages);
app.use("/api/keys", keys)


async function main() {

  try {
    // optionaly connect to your mongo database using the environment variable MONGO_URI
    await connectToDB(process.env.MONGO_URI);

    app.listen(port, () => console.log(`App is listening on ${port}`));
  }
  catch(error) {
    console.log(error);
  } 
}

main();
