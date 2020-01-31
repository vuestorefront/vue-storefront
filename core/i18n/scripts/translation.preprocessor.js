const fs = require('fs')
const path = require('path')
const dsvFormat = require('d3-dsv').dsvFormat
const dsv = dsvFormat(',')
const { currentBuildLocales } = require('../helpers')

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

module.exports = function (csvDirectories, config = null) {
  const currentLocales = currentBuildLocales()
  const fallbackLocale = 'en-US'
  let messages = {}
  let languages = []

  // get messages from CSV files
  csvDirectories.forEach(directory => {
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

  // create fallback
  console.debug(`Writing JSON file fallback: ${fallbackLocale}.json`)
  fs.writeFileSync(path.join(__dirname, '../resource/i18n', `${fallbackLocale}.json`), JSON.stringify(messages[fallbackLocale]))

  // bundle all messages in one file
  if (config && config.i18n.bundleAllStoreviewLanguages) {
    const bundledLanguages = { [fallbackLocale]: messages[fallbackLocale] } // fallback locale
    bundledLanguages[config.i18n.defaultLocale] = messages[config.i18n.defaultLocale] // default locale
    currentLocales.forEach((locale) => {
      bundledLanguages[locale] = messages[locale]
    })

    console.debug(`Writing JSON file multistoreLanguages`)
    fs.writeFileSync(path.join(__dirname, '../resource/i18n', `multistoreLanguages.json`), JSON.stringify(bundledLanguages))
  } else {
    currentLocales.forEach((language) => {
      if (language === fallbackLocale) return // it's already loaded
      const filePath = path.join(__dirname, '../resource/i18n', `${language}.json`)
      console.debug(`Writing JSON file: ${language}.json`)
      fs.writeFileSync(filePath, JSON.stringify(messages[language]))
    })
    fs.writeFileSync(path.join(__dirname, '../resource/i18n', `multistoreLanguages.json`), JSON.stringify({})) // fix for webpack compilation error in case of `bundleAllStoreviewLanguages` = `false` (#3188)
  }
}
