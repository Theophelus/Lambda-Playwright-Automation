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
