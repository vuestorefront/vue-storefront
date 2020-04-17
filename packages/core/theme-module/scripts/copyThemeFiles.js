const fs = require('fs');
const getAllFilesFromDir = require('./getAllFilesFromDir.js');
const ensureDirectoryExists = require('./ensureDirectoryExists');

async function copyFile(fileDir, outDir) {
  const data = fs.readFileSync(fileDir, 'utf8');

  ensureDirectoryExists(outDir);
  return fs.writeFileSync(outDir, data);
}

function copyThemeFile(path) {
  return copyFile(path, path.replace('/theme/', '/theme/.theme/'));
}

function copyThemeFiles(filesDir) {
  return Promise.all(getAllFilesFromDir(filesDir).map(
    file => copyThemeFile(file)
  ));
}

module.exports = {
  copyThemeFile,
  copyThemeFiles
};
