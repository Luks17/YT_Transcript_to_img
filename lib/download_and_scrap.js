
const youtubedl = require("youtube-dl-exec");
const { resolve } = require("path");
const { unlink, readFile } = require("fs").promises

const scrap = async (filePath, isAutoGenSub) => {
  let text = await readFile(`${filePath}.en.vtt`, "utf-8");
  const regex = /(WEBVTT\nKind: captions\nLanguage: en\n\n)|((\w+\s)?<\d\d:\d\d:\d\d.\d\d\d><c>\w+(('|-)\w+)?\s?\s?<\/c>)|((\d\d:){2}\d\d\.\d{3}(\s-->\s)?(\s\w+:\w+\s\w+:\d%)?)/g

  text = text.replace(regex, "");
  text = text.replace(/\s\n/g, "");

  if(isAutoGenSub) {
    text = text.replace(/\n/g, "");
    text = text.replace(/\s\s/g, "\n");
  }
  else {
    text = text.slice(1); // this is needed because the used regex leaves always a \n at the start
  }
  unlink(`${filePath}.en.vtt`); // this deletes the downloaded transcription after everything else finishes, because it's a promise

  return text;
}

const getVideoTranscription = async (url) => {
  const fileName = url.replace("https://www.youtube.com/watch?v=", "");
  const filePath = resolve("data", fileName);

  await youtubedl(url, {
    writeSub: true,
    writeAutoSub: true,
    skipDownload: true,
    output: filePath
  })

  const subs = await youtubedl(url, { listSubs: true })
  const isAutoGenSub = subs.includes("Available automatic captions");

  return await scrap(filePath, isAutoGenSub);
}

module.exports = getVideoTranscription;
