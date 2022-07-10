
const envParamsExistence = () => {
  const envExists = { 
    mongoUri: true, 
    googleCredentials: true, 
  };

  if(!process.env.MONGO_URI)
    exists.mongoUri = false;
  
  if(!process.env.API_KEY || !process.env.SEARCH_ENGINE_ID)
    exists.googleCredentials = false;

  return envExists;
}

module.exports = envParamsExistence;