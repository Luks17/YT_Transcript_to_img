
let transcriptionBtn;
let imagesBtn;


function toggleTranscriptions() {
  transcriptionBtn.classList.toggle("showing-transcript");
}

function toggleImages() {
  imagesBtn.classList.toggle("showing-images");
}

function startShowContent() {
  transcriptionBtn = selectElement("#transcription-btn");
  imagesBtn = selectElement("#images-btn");

  transcriptionBtn.addEventListener("click", toggleTranscriptions);
  imagesBtn.addEventListener("click", toggleImages);
}
