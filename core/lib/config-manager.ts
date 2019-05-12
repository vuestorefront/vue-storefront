import buildTimeConfig from 'config'

const ConfigManager = {
  _currentConfig: null,
  setConfig (config: any) {
    this._currentConfig = config
  },
  getBaseConfig() { // pre-bundled config - which is not supporting the `dynamicConfigReload` option
    return buildTimeConfig    
  },
  getConfig () {
    return this._currentConfig !== null ? this._currentConfig : buildTimeConfig
  }
}

export { ConfigManager }
