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
  const coreMessages = {}
  const fs = require('fs')
  const path = require('path')
  const dsvFormat = require('d3-dsv').dsvFormat
  const dsv = dsvFormat(',')

  csvDirectories.forEach(function (directory) {
    fs.readdirSync(directory).forEach(file => {
      let fullFileName = directory + '/' + file
      let extName = path.extname(fullFileName)
      let baseName = path.posix.basename(file, extName)
      // console.log(fullFileName)
      // console.log(extName)
      if (extName === '.csv') {
        // console.log(baseName)
        let fileContent = fs.readFileSync(fullFileName, 'utf8')
        coreMessages[baseName] = convertToObject(dsv.parseRows(fileContent))
      }
    })
  })
  // console.log(coreMessages)
  // throw new Error('test')

  return {
    code: JSON.stringify(coreMessages)
  }
}

