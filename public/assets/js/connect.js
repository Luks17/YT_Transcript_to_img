
const submitButton = selectElement(".submit-connection-btn");
const mainTitle = document.title;

// There are 2 types of possible connections on the API: google and mongodb. This variable assumes that mongodb is the default connection
let mongoConnection = true;
let connectionName = "mongodb";


function checkConnection() {
  let content = {
    mongo_uri: null,
    google_api_key: null,
    google_cx: null
  };

  if (mainTitle.includes("Google")) {
    mongoConnection = false;
  }

  if (mongoConnection) {
    content.mongo_uri = selectElement(".mongo-uri-input").value;

  }
  else {
    content.google_api_key = selectElement(".google-key-input").value;
    content.google_cx = selectElement(".google-cx-input").value;
    connectionName = "google";
  }

  return content;
}

async function submitContent() {
  const content = checkConnection();

  try {
    axios.post(`/api/keys/${connectionName}`, content);
  }
  catch(error) {
    console.log(error);
  }
}


submitButton.addEventListener("click", submitContent);
