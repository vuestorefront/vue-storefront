import fs from 'fs-extra'
import path from 'path'
function saveRenderedPage (destPath, output) {
  return fs.outputFile(destPath, output)
}
function saveScripts (basePath, destPath) {
  return fs.copy(path.join(basePath, 'dist'), path.join(destPath, 'dist'))
}
function saveAssets (basePath, destPath) {
  return fs.copy(path.join(basePath, 'assets'), path.join(destPath, 'assets'))
}
function saveIndex (basePath, destPath) {
}
function saveSW (basePath, destPath) {
  return fs.copy(path.join(basePath, 'dist', 'service-worker.js'), path.join(destPath, 'service-worker.js'))
}
function clearAll (destPath) {
  return fs.removeSync(destPath)
}
export default {
  saveRenderedPage,
  saveAssets,
  saveIndex,
  saveSW,
  saveScripts,
  clearAll
}
