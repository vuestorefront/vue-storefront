/**
 *  Converts an Array to an Object
 */
function convertToObject (array) {
  const obj = []
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

  csvDirectories.forEach(directory => {
    fs.readdirSync(directory).forEach(file => {
      let fullFileName = path.join(directory, file)
      let extName = path.extname(fullFileName)
      let baseName = path.posix.basename(file, extName)
      if (extName === '.csv') {
        let fileContent = fs.readFileSync(fullFileName, 'utf8')
        console.debug('Processing translation file: ' + fullFileName + ' => ' + baseName)
        coreMessages[baseName] = Object.assign(coreMessages[baseName] ? coreMessages[baseName] : {}, convertToObject(dsv.parseRows(fileContent)))
      }
    })
  })
  return {
    code: `module.exports = ${JSON.stringify(coreMessages)};`
  }
}
