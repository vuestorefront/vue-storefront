// You can extend Vue Storefront server routes by binding to the Express.js (expressApp) in here
module.exports.registerUserServerRoutes = (expressApp) => {
  require('./example/generator')(expressApp)
}
// module.exports.loadConfig = async (req) => {
//   const axios = require('axios')
//   let config = await axios.get('http://api.crelatio.test', {
//     params: {
//       api_key: 'API_KEY__001'
//       // domain: req.headers.host
//     }
//   })
//   return config
// }

module.exports.loadConfig = (req) => {
  const axios = require('axios')
  return new Promise((resolve, reject) => axios.get('http://api.crelatio.test', {
    params: {
      api_key: 'API_KEY__001',
      domain: req.headers.host
    }
  }).then(res => {
    resolve(res.data)
  }).catch(error => reject(error)))
}
