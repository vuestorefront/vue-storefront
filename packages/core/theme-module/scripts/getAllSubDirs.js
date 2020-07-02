const fs = require('fs');
const path = require('path');

/**
 *
 * @param {string} directoryPath
 * @returns {Array<string>}
 */
const getAllSubDirs = directoryPath => fs.readdirSync(directoryPath).filter(
  file => fs.statSync(path.join(directoryPath, file)).isDirectory()
);

module.exports = getAllSubDirs;
