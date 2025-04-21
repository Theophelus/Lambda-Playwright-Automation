import winston from "winston";
import moment from "moment-timezone";
import chalk from "chalk";
import path from "path";

//navigate/find to logging dir
const logginDir = path.resolve(__dirname, "..", "logging");

//format log entries
const customFormat = winston.format.printf(({ level, message, timestamp }) => {
  let chalkColorPalletteLevel = level;

  switch (level) {
    case "info":
      chalkColorPalletteLevel = chalk.green(level);
      break;
    case "error":
      chalkColorPalletteLevel = chalk.red(level);
      break;
  }
  return `${timestamp} [${chalkColorPalletteLevel}]: ${message}`;
});

//create logger
const logger = winston.createLogger({
  format: winston.format.combine(winston.format.timestamp(), customFormat),
  //write logs
  transports: [
    new winston.transports.Console({ level: "debug" }),
    new winston.transports.File({
      filename: path.join(logginDir, "execution_run.log"),
      level: "info",
    }),
    new winston.transports.File({
      filename: path.join(logginDir, "error.log"),
      level: "error",
    }),
  ],
});

//export logger
export default logger;
