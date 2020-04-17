const fs = require('fs');
const path = require('path');

module.exports = function ensureDirectoryExists (filePath) {
  const dirname = path.dirname(filePath);
  if (fs.existsSync(dirname)) {
    return true;
  }
  ensureDirectoryExists(dirname);
  fs.mkdirSync(dirname);
};
