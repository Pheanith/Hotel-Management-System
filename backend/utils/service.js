const fs = require('fs/promises');
const moment = require('moment');
const logError = async (controller,message,res) =>{
  try{
    const timestamp = moment().format("DD/MM/YYYY HH:mm:ss");
    const path = "./logs" + controller+ ".txt";
    const logMessage = "["+ timestamp +"]" + message +"\n\n";
    await fs.appendFile(path,logMessage);
  }catch(error){
    console.log("Error writing to log file:",error);

  }
  res.status(500).send ("Internal Server Error" );
};

const isEmptyOrNull = (value) => {
  if(value === "" || value === null || value === undefined){
    return true;
  }
  return false;
};
module.exports ={
  logError,
}
