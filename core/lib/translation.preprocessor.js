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

module.exports = function () {
  /*
console.warn('Start Message Array:')
console.warn(coreMessages)
console.warn('Stop Message Array:')
if (coreMessages) {
  throw new Error('test')
}
*/

  const coreMessages = {
    'en-US':
      convertToObject(require('dsv-loader?rows!core/resource/i18n/en-US.csv')),
    'de-DE':
      convertToObject(require('dsv-loader?rows!core/resource/i18n/de-DE.csv'))
  }
  return coreMessages
}

