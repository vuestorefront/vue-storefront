const fs = require('fs');
const path = require('path');

/**
 *
 * @param {string} directoryPath
 * @param {Array<string>} omitDirectories
 * @returns {Array<string>}
 */
const getAllSubDirs = (directoryPath, omitDirectories = []) => fs.readdirSync(directoryPath).filter(
  file => fs.statSync(path.join(directoryPath, file)).isDirectory() && !omitDirectories.includes(file)
);

module.exports = getAllSubDirs;
