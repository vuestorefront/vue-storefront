// You can extend Vue Storefront server routes by binding to the Express.js (expressApp) in here
module.exports.registerUserServerRoutes = (expressApp) => {
  require('./robots')(expressApp)
}

// Use can use dynamic config by using this function below:
// (Needs to return a Promise)
// module.exports.configProvider = (req) => {
//   const axios = require('axios')
//   return new Promise((resolve, reject) => axios.get('myapi.com/config', {
//     params: {
//       domain: req.headers.host
//     }
//   }).then(res => {
//     resolve(res.data)
//   }).catch(error => reject(error)))
// }

/**
 * Import store specific configs from /config folder to prevent single
 * config files from getting to large lately and also have
 * store specific configruations which can be inherited.
 * The file must be like /config/local-{mandant}-storeview-{store-code}.json
 * and extend the specific `config.storeViews` item of parent.
 */
module.exports.configProvider = (req) => {
  const fs = require('fs')
  const path = require('path')

  let storeViews = {}

  const configPath = path.resolve(__dirname, '../../config')
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
