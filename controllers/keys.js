
const { readFile, writeFile } = require("fs").promises;
const checkEnvParams = require("../lib/env_params_existence");

const envParamsExistence = checkEnvParams();


const insertGoogleKeys = async (req, res) => {
  if(!req.body.google_api_key || !req.body.google_cx) {
    return res.status(400).json({ msg: "No google_api_key and/or google_cx provided." });
  }

  const googleString = `\nAPI_KEY=${req.body.google_api_key}\nSEARCH_ENGINE_ID=${req.body.google_cx}`;

  if(envParamsExistence.googleCredentials) {
    try {
      const env = await readFile(".env", "utf-8");
      const newEnv = env.replace(/((\n)?API_KEY=.+)|(\n)?SEARCH_ENGINE_ID=.+/g, "");

      await writeFile(".env", newEnv);
    }
    catch(error) {
      console.log(error);
      return res.status(500).json({ msg: error });
    }
  }

  try{
    await writeFile(".env", googleString, { flag: "a" });
  }
  catch(error) {
    console.log(error);
    return res.status(500).json({ msg: error });
  }

  res.status(200).json({ msg: "success" });
}

const insertMongoString = async (req, res) => {
  if(!req.body.mongo_uri) {
    return res.status(400).json({ msg: "No mongo_uri provided." });
  }

  const mongoString = `\nMONGO_URI=${req.body.mongo_uri}`;
  
  if(envParamsExistence.mongoUri) {
    try{
      const env = await readFile(".env", "utf-8");
      const newEnv = env.replace(/((\n)?MONGO_URI=.+)/g, "");

      await writeFile(".env", newEnv);
    }
    catch(error) {
      console.log(error);
      return res.status(500).json({ msg: error });
    }
  }

  try{
    await writeFile(".env", mongoString, {flag: "a"});
  }
  catch(error) {
    console.log(error);
    return res.status(500).json({ msg: error });
  }

  res.status(200).json({ msg: "sucess" });
}

module.exports = { insertGoogleKeys, insertMongoString };
