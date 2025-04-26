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

    let updateEnvValues = readEnvFile.map((line) => {
      //split and get each key
      const [key] = line.split("=");
      logger.info(`.envi key values: ${key}`);
      //update the value if the key exists in the mpa
      if (map.has(key.trim())) {
        return `${key.trim()}=${map.get(key.trim())}`;
      }

      //else keep the map unchanged
      return line;
    });

    //write updated values unti the .env file
    fs.writeFileSync(file_path, updateEnvValues.join("\n"), {
      encoding: "utf8",
    });

    logger.info(readEnvFile);
  } catch (error) {
    logger.error(`Error while updating the .env file: ${error}`);
    throw error;
  }
}

export default saveCreds;
