
function lightTranscript(transcript) {
  const newTranscription = new Array();
  for (let i = 0; i < transcript.length; i++) {
    if (i % 2 != 0) {
      newTranscription.push(transcript[i - 1].concat(" " + transcript[i]));
      continue;
    }
    if (i === transcript.length - 1) {
      newTranscription.push(transcript[i]);
    }
  }

  return newTranscription;
}

module.exports = { lightTranscript };
