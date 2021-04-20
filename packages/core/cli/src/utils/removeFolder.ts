import rimraf from 'rimraf';
const path = require('path');

export function removeFolder(parentPath, folderName) {
  rimraf.sync(path.join(parentPath, folderName));
}
