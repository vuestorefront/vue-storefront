import fs from 'fs';

const isImage = require('./isImage');
const ensureDirectoryExists = require('./ensureDirectoryExist');

export async function copyFile(fileDir, outDir) {
  const data = fs.readFileSync(fileDir, !isImage(fileDir) ? 'utf8' : undefined);
  ensureDirectoryExists(outDir);
  return fs.writeFileSync(outDir, data);
}
