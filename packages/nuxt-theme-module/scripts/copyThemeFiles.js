const fs = require('fs');
const path = require('path');
const isImage = require('./isImage');
const getAllFilesFromDir = require('./getAllFilesFromDir.js');
const ensureDirectoryExists = require('./ensureDirectoryExists');

async function copyFile(fileDir, outDir) {
  const data = fs.readFileSync(fileDir, !isImage(fileDir) ? 'utf8' : undefined);
  ensureDirectoryExists(outDir);
  return fs.writeFileSync(outDir, data);
}

function copyThemeFile(themePath) {
  return copyFile(themePath, themePath.replace(path.sep + 'theme' + path.sep, path.sep + 'theme' + path.sep + '_theme' + path.sep));
}

function copyThemeFiles(filesDir) {
  return Promise.all(getAllFilesFromDir(filesDir).map(
    file => copyThemeFile(file)
  ));
}

module.exports = {
  copyFile,
  copyThemeFile,
  copyThemeFiles
};
