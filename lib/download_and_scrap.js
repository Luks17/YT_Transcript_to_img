
const youtubedl = require("youtube-dl-exec");
const { resolve } = require("path");
const { unlink, readFile } = require("fs").promises

const scrap = async (filePath) => {
  let text = await readFile(`${filePath}.en.vtt`, "utf-8");
  const header = /((WEBVTT\n)(Kind:\scaptions\n)(Language:\s..\n)?\n)/g
  const body = /(.+\s-->\s.+)|(.+<c>.+)|(\s\n)|\[.+\]\s?/g

  text = text.replace(header, "");
  text = text.replace(body, "");
  text = text.replace(/\n(?=(\n))/g, "");
  text = text.slice(1);

  unlink(`${filePath}.en.vtt`); // this deletes the downloaded transcription after everything else finishes, because it's a promise

  return text;
}

const getVideoTitleAndTranscription = async (url) => {
  const fileName = url.replace("https://www.youtube.com/watch?v=", "");
  const filePath = resolve("data", fileName);

  await youtubedl(url, {
    skipDownload: true,
    writeSub: true,
    writeAutoSub: true,
    output: filePath,
  });

  const title = await youtubedl(url, { skipDownload: true, getTitle: true });

  const text = await scrap(filePath);

  return {title, text};
}

module.exports = getVideoTitleAndTranscription;
