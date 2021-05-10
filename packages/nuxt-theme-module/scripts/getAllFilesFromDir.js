const fs = require('fs');
const path = require('path');
const parentDirectory = path.resolve(__dirname, '..');

/**
 *
 * @param {string} dirPath
 * @param {Array<string>} arrayOfFiles
 * @returns {Array<string>}
 */
const getAllFilesFromDir = (dirPath, arrayOfFiles = []) => {
  const files = fs.readdirSync(dirPath);
  files.forEach((file) => {
    if (fs.statSync(dirPath + path.sep + file).isDirectory()) {
      arrayOfFiles = getAllFilesFromDir(dirPath + path.sep + file, arrayOfFiles);
    } else {
      arrayOfFiles.push((dirPath + path.sep + file).split(parentDirectory + path.sep).pop());
    }
  });

  return arrayOfFiles;
};

module.exports = getAllFilesFromDir;
