const fs = require('fs')
const path = require('path')
const dsvFormat = require('d3-dsv').dsvFormat
const dsv = dsvFormat(',')

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

module.exports = function (csvDirectories) {
  let messages = {}
  let languages = []

  csvDirectories.forEach(function (directory) {
    fs.readdirSync(directory).forEach(file => {
      const fullFileName = path.join(directory, file)
      const extName = path.extname(fullFileName)
      const baseName = path.posix.basename(file, extName)
      if (extName === '.csv') {
        const fileContent = fs.readFileSync(fullFileName, 'utf8')
        if (languages.indexOf(baseName) === -1) {
          languages.push(baseName)
        }
        console.debug(`Processing translation file: ${fullFileName}`)
        messages[baseName] = Object.assign(messages[baseName] ? messages[baseName] : {}, convertToObject(dsv.parseRows(fileContent)))
      }
    })
  })

  languages.forEach(function (language) {
    console.debug(`Writing JSON file: ${language}.json`)
    fs.writeFileSync(path.join(__dirname, '../resource/i18n', `${language}.json`), JSON.stringify(messages[language]))
  })
}
