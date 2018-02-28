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

module.exports = function (csvDirectories) {
  /*
console.warn('Start Message Array:')
console.warn(coreMessages)
console.warn('Stop Message Array:')
if (coreMessages) {
  throw new Error('test')
}
*/
  csvDirectories.forEach(csvDirectories){
    const testFolder = './tests/'
    const fs = require('fs')

    fs.readdirSync(testFolder).forEach(file => {
      console.log(file);
    })
  }



  const coreMessages = {
    'en-US':
      convertToObject(require('dsv-loader?rows!core/resource/i18n/en-US.csv')),
    'de-DE':
      convertToObject(require('dsv-loader?rows!core/resource/i18n/de-DE.csv'))
  }
  return coreMessages
}

