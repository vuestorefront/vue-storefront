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
