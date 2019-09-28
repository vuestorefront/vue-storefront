import config from 'config'
import { clearCache } from './cache'
import { Logger } from '@vue-storefront/core/lib/logger'

const _getVersion = async () => {
  try {
    const version = await fetch(`${config.clearCache.version.endpoint}?timestmp=${Date.now()}`)
    return version
  } catch (error) {
    Logger.error('CLEAR CACHE: Error through recieve server version VSF - ', error)()
  }
}

const checkVersion = async () => {
  const response = await _getVersion()
  let serverVersion = await response.json()
  if (serverVersion.code === 200) {
    serverVersion = serverVersion.result
    const clientVersion = localStorage.getItem(config.clearCache.version.key)
    Logger.info('CLEAR CACHE: Current server version VSF - ', serverVersion)()
    Logger.info('CLEAR CACHE: Current client version VSF - ', clientVersion)()

    if ((serverVersion && clientVersion && serverVersion.toString() !== clientVersion.toString()) || !clientVersion) {
      Logger.info('CLEAR CACHE: Server version does not match client version, start clear cache')()
      clearCache()
    } else if (serverVersion && clientVersion && serverVersion.toString() === clientVersion.toString()) {
      Logger.info('CLEAR CACHE: The client has the current version of the site')()
    }

    localStorage.setItem(config.clearCache.version.key, serverVersion)
  } else {
    Logger.info('CLEAR CACHE: the answer code does not 200')()
  }
}

export {
  checkVersion
}
