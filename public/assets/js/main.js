
const getContentBtn = selectElement("#get-content-btn");
const pushContentBtn = selectElement("#push-content-btn");
const contentDOM = selectElement("#database-content");



function getContent() {
  axios.get("/api/transcriptions")
  .then(res => {
    const transcriptions = res.data.map(transcript => `
      <li class="container centralize">
        <div class="content-main-btns">
          <button class="btn centralize highlight content-info">
            <i class="ri-information-line"></i>
          </button>
          <button class="btn centralize highlight content-get-images">
            <i class="ri-image-add-fill"></i>
            <span>Get images</span>
          </button>
        </div>

        <h4 class="content-name">${transcript.videoTitle}</h4>

        <div class="transcriptions">
          <button class="btn centralize highlight content-btn" id="transcription-btn">
            <i class="ri-add-line centralize show-transcript">
              <span>Show Transcription</span>
            </i>
            <i class="ri-subtract-line centralize hide-transcript">
              <span>Hide Transcription</span>
            </i>
          </button>
        </div>
        <div class="images">
          <button class="btn centralize highlight content-btn" id="images-btn">
            <i class="ri-add-line centralize show-images">
              <span>Show Images</span>
            </i>
            <i class="ri-subtract-line centralize hide-images">
              <span>Hide Images</span>
            </i>
          </button>
        </div>
      </li>`
    ).join("");
    console.log(transcriptions);
    contentDOM.innerHTML = transcriptions;
    startShowContent();
  })
  .catch(error => {
    console.log(error);
    return;
  });
}


getContentBtn.addEventListener("click", getContent);
pushContentBtn.addEventListener("click", () => console.log("b"));
