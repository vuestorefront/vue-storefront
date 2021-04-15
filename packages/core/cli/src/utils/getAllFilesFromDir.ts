import fs from 'fs';
import path from 'path';

const parentDirectory = path.resolve(__dirname, '..');

/**
 *
 * @param {string} dirPath
 * @param {Array<string>} arrayOfFiles
 * @returns {Array<string>}
 */
export const getAllFilesFromDir = (dirPath, arrayOfFiles = []) => {
  const files = fs.readdirSync(dirPath);
  files.forEach((file) => {
    if (fs.statSync(dirPath + path.sep + file).isDirectory()) {
      arrayOfFiles = getAllFilesFromDir(
        dirPath + path.sep + file,
        arrayOfFiles
      );
    } else {
      arrayOfFiles.push(
        (dirPath + path.sep + file).split(parentDirectory + path.sep).pop()
      );
    }
  });

  return arrayOfFiles;
};
