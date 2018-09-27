// You can extend Vue Storefront server routes by binding to the Express.js (expressApp) in here
module.exports.registerUserServerRoutes = (expressApp) => {
  require('./sitemap/generator')(expressApp)
}
