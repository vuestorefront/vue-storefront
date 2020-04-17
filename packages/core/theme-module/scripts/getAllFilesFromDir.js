const fs = require('fs');

const parentDirectory = __dirname.replace(/(\/\w*)$/g, '');

/**
 *
 * @param {string} dirPath
 * @param {Array<string>} arrayOfFiles
 * @returns {Array<string>}
 */
const getAllFilesFromDir = (dirPath, arrayOfFiles = []) => {
  const files = fs.readdirSync(dirPath);
  files.forEach((file) => {
    if (fs.statSync(dirPath + '/' + file).isDirectory()) {
      arrayOfFiles = getAllFilesFromDir(dirPath + '/' + file, arrayOfFiles);
    } else {
      arrayOfFiles.push((dirPath + '/' + file).split(parentDirectory + '/').pop());
    }
  });

  return arrayOfFiles;
};

module.exports = getAllFilesFromDir;
