import { serverHooks } from '@vue-storefront/core/server/hooks'

serverHooks.afterApplicationInitialized(({ app }) => {
  const config = require('config')
  const apiStatus = require('@vue-storefront/core/scripts/utils/api-status')

  if (config.clearCache && config.clearCache.enabled) {
    const expressWs = require('express-ws')(app)

    if (config.clearCache.websocket.enabled) {
      expressWs.app.ws(config.clearCache.websocket.endpoint, (ws, req) => {
        ws.on('message', msg => {
          msg = msg.trim()
          if (msg === config.clearCache.websocket.key) {
            expressWs.getWss().clients.forEach(client => {
              if (client.readyState === 1) {
                client.send(msg)
              }
            })
          }
        })

        ws.on('error', err => {
          console.error('Websocket error - ', err)
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
})
