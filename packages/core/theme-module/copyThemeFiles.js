const fs = require('fs');
const path = require('path');

function ensureDirectoryExists (filePath) {
  const dirname = path.dirname(filePath);
  if (fs.existsSync(dirname)) {
    return true;
  }
  ensureDirectoryExists(dirname);
  fs.mkdirSync(dirname);
}

const getAllFiles = (dirPath, arrayOfFiles) => {
  arrayOfFiles = arrayOfFiles || [];
  const files = fs.readdirSync(dirPath);
  files.forEach((file) => {
    if (fs.statSync(dirPath + '/' + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + '/' + file, arrayOfFiles);
    } else {
      arrayOfFiles.push((dirPath + '/' + file).split(__dirname + '/').pop());
    }
  });

  return arrayOfFiles;
};

function copyFile(fileDir, outDir) {
  fs.readFile(fileDir, 'utf8', (err, data) => {

    ensureDirectoryExists(outDir);
    fs.writeFile(outDir, data, err =>{
      if (err) throw err;
    });
  });
}

module.exports = function copyThemeFiles(filesDir) {
  getAllFiles(filesDir).forEach(
    file => copyFile(file, file.replace('/theme/', '/theme/.theme/'))
  );
};
