module.exports = (req) => {
  const fs = require('fs')
  const path = require('path')

  let storeViews = {}

  const configPath = path.resolve(__dirname, '../../../config')
  const { NODE_APP_INSTANCE: man } = process.env

  const regex = new RegExp('local-(' + man + ')-storeview-(\\w*)\\.json', 'i')

  return new Promise((resolve, reject) => {
    try {
      fs.readdirSync(configPath).forEach(file => {
        if (regex.test(file)) {
          const [fileName, mandant, storeCode] = regex.exec(file)
          storeViews[storeCode] = require(path.resolve(configPath, fileName))
        }
      })

      resolve({ storeViews })
    } catch (error) {
      reject(error)
    }
  })
}
