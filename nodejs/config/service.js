const fs = require("fs/promises");
const moment = require("moment");
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

module.exports = {
  logError,
};