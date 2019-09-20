
const compression = require('compression')
module.exports = (app, moduleConfig) => {
  if (moduleConfig.enabled) {
    console.log('Output Compression is enabled')
    app.use(compression(moduleConfig))
  }
}
