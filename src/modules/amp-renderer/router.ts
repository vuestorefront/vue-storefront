import config from 'config'

let AmpThemeRouting

try {
  const themeName = config.theme.replace('@vue-storefront/theme-', '')
  AmpThemeRouting = require(`src/themes/${themeName}-amp/router`)
} catch (err) {
  AmpThemeRouting = null
}

export default AmpThemeRouting
