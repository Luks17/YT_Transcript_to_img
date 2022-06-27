
const youtubedl = require("youtube-dl-exec");
const { resolve } = require("path");
const { unlink, readFile } = require("fs").promises

const scrap = async (filePath) => {
  let text = await readFile(`${filePath}.en.vtt`, "utf-8");
  const regex = /(WEBVTT\nKind: captions\nLanguage: en\n\n)|((\w+\s)?<\d\d:\d\d:\d\d.\d\d\d><c>\w+(('|-)\w+)?\s?\s?<\/c>)|((\d\d:){2}\d\d\.\d{3}(\s-->\s)?(\s\w+:\w+\s\w+:\d%)?)/g

  text = text.replace(regex, "");
  text = text.replace(/\s\n/g, "");
  text = text.replace(/\n/g, "");
  text = text.replace(/\s\s/g, "\n");

  await unlink(`${filePath}.en.vtt`);

  return text;
}

const getVideoTranscription = async (url) => {
  const fileName = url.replace("https://www.youtube.com/watch?v=", "");
  const filePath = resolve("data", fileName);

  await youtubedl(url, {
    writeAutoSub: true,
    skipDownload: true,
    output: filePath
  })

  return await scrap(filePath);
}

module.exports = getVideoTranscription;
