
const google = require("googleapis").google;
const customSearch = google.customsearch("v1");
const { createWriteStream } = require("fs");


async function getImageURL(query) {
  const googleCredentials = {
    key: process.env.API_KEY,
    cx: process.env.SEARCH_ENGINE_ID,
  };

  const searchResult = await customSearch.cse.list({
    key: googleCredentials.key,
    cx: googleCredentials.cx,
    searchType: "image",
    q: query,
    num: 1,
  })

  return searchResult.data.items[0].link;
}

const downloadImage = async (url, path) => {
  return new Promise((resolve, reject) => {
    const req = url.startsWith("https") ? require("https") : require("http");

    req.get(url, res => {
      if (res.statusCode !== 200) {
        res.resume(); // consumes res stream data without actually processing it
        reject(new error(`Could not download image!\nStatus Code: ${res.statusCode}`));
        return;
      }
      res.pipe(createWriteStream(path))
        .on("error", reject)
        .once("close", () => resolve(path));

    }).on("error", reject);
  })
}

module.exports = { getImageURL, downloadImage };
