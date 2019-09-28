import config from 'config'
import { clearCache } from './cache'
import rootStore from '@vue-storefront/core/store'
import { Logger } from '@vue-storefront/core/lib/logger'

const connect = () => {
  const socket = new WebSocket(`${window.location.protocol === 'https:' ? 'wss' : 'ws'}://${window.location.host}/clear-cache`)

  socket.onopen = () => {
    Logger.info('CLEAR CACHE: Connection established.')()
  }

  socket.onmessage = async (msg) => {
    if (msg.data === config.clearCache.websocket.key) {
      clearCache()
      // show the user a message
      rootStore.dispatch('clear-cache/toggleOpen', true)
    }
  }

  socket.onclose = (event) => {
    if (event.wasClean) {
      Logger.info('CLEAR CACHE: Connection closed clear.')()
    } else {
      Logger.error('CLEAR CACHE: Connection break.')() // for example, 'kill' proccess server
    }
    Logger.info('CLEAR CACHE: Code: ' + event.code + ' reason: ' + event.reason)()
    Logger.info('CLEAR CACHE: Reconnect after 1 second.')()
    setTimeout(() => {
      connect()
    }, 1000)
  }
}

export {
  connect
}
