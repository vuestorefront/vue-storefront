import fs from "fs";

export const initLogger = () => {
  const logFile = fs.createWriteStream("CLI_logs.txt", { flags: "a" });

  const writeLog = (message: string) => {
    logFile.write(`${message}\n`);
  };

  const deleteLog = () => {
    fs.unlinkSync("CLI_logs.txt");
  };

  return {
    writeLog,
    deleteLog,
  };
};
