/**
 * In a scenarion where this utility runs, would be in your pre-requisites, stage of your pipeline to store new user creds and reuse the across demanding tests.
 */

/**import modules */
import fs from "fs";
import path from "path";
import logger from "./LoggerUtils";

function saveCreds(map: Map<string, string>): void {
  try {
    //resolve the path to the .env file
    const file_path = path.resolve(__dirname, "..", "config/.env");
    //read and spit the .env into lines
    const readEnvFile = fs.readFileSync(file_path, "utf8").split("\n");
    
    logger.info(readEnvFile);
  } catch (error) {
    logger.error(`Error while updating the .env file: ${error.message}`);
  }


}

export default saveCreds;
