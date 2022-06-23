
const mongoose = require("mongoose");

// returns promise
const connectToDB = (url) => {
  return mongoose
    .connect(url)
    .then(() => console.log("Connected to the DB"))
    .catch((err) => console.log(err));
}


module.exports = connectToDB;
