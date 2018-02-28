/**
 *  Converts an Array to an Object
 */
function convertToObject (array) {
  const obj = {}
  array.forEach((element, index, array) => {
    obj[element[0]] = element[1]
  })
  return obj
}

module.exports = function (options) {
  const csvDirectories = options.csvDirectories

  /*
console.warn('Start Message Array:')
console.warn(coreMessages)
console.warn('Stop Message Array:')
if (coreMessages) {
  throw new Error('test')
}
*/
  const coreMessages = {}
  const fs = require('fs')
  const path = require('path')

  csvDirectories.forEach(function (directory) {
    fs.readdirSync(directory).forEach(file => {
      let fullFileName = directory + '/' + file
      if (path.extname(fullFileName).equals('csv')) {
        let baseName = path.posix.basename(file)
        console.log(baseName)
        let fileContent = fs.readFileSync(fullFileName)
        coreMessages[baseName] = convertToObject(JSON.parse(fileContent))
      }
    })
  })
  console.log(coreMessages)
  throw new Error('test')

  return coreMessages
}

