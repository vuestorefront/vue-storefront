module.exports = (app) => {
  const config = require('config')
  const apiStatus = require('@vue-storefront/core/scripts/utils/api-status')

  if (config.clearCache && config.clearCache.enabled) {
    require('express-ws')(app)
    let wsClients = []

    if (config.clearCache.websocket.enabled) {
      app.ws(config.clearCache.websocket.endpoint, (ws, req) => {
        const index = wsClients.push(ws) - 1

        ws.on('message', msg => {
          if (msg === config.clearCache.websocket.message) {
            for (let client of wsClients) {
              client.send(msg)
            }
          }
        })

        ws.on('open', () => {
          console.log('Webscoket - connection established')
        })

        ws.on('error', err => {
          console.error('Websocket error - ', err)
        })

        ws.on('close', () => {
          wsClients.splice(index, 1)
        })
      })
    }

    if (config.clearCache.version.enabled) {
      app.get(config.clearCache.version.endpoint, (req, res) => {
        const version = process.env[config.clearCache.version.envName] || 1
        apiStatus(res, version, 200)
      })
    }
  }
}
