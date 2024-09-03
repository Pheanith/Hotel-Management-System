const fs = require("fs/promises");
const moment = require("moment");
const jwt = require("jsonwebtoken");
const { Config } = require("./config");
// npm install moment
// requeired create folder logs in root projet
// node-api/logs
const logError = async (controller, message, res) => {
  try {
    // Append the log message to the file (create the file if it doesn't exist)
    const timestamp = moment().format("DD/MM/YYYY HH:mm:ss"); // Use 'moment' for formatted timestamp
    const path = "./logs/" + controller + ".txt";
    const logMessage = "[" + timestamp + "] " + message + "\n\n";
    await fs.appendFile(path, logMessage);
  } catch (error) {
    console.error("Error writing to log file:", error);
  }
  res.status(500).send("Internal Server Error!");
};

const isEmptyOrNull = (value) => {
  if (value === "" || value === null || value === undefined){
    return true;
  }
  return false;
};
const validate_token = () =>{
  // call in middleware in route (role, users , ..)
  return(req,res,next) =>{
    var authorization = req.headers.authorization; // token from client
    var token_from_client = null;
    if(authorization != null && authorization != ""){
      token_from_client = authorization.split(" "); // authorization : "HHJLKJG45UOIKMHYFH4545769990I7YNBGHFTRFDCFGM"
      token_from_client = token_from_client[1]; // get only access token
    }
    if(token_from_client == null){
      res.status(401).send({
        message: "Unauthorized",
      });
    }else{
      jwt.verify(token_from_client, Config.ACCESS_TOKEN_KEY,(error,result)=>{
        if(error){
          res.status(401).send({
            message: "Unauthorized",
            error: error,
          });
        }else{
          req.user = result.data; // write user property
          req.user_id = result.data.Id; // write user property
          next();
        }
      });
    }
  };
};

module.exports = {
  logError,
  isEmptyOrNull,
  validate_token,
};