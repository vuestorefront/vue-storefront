let AmpThemeRouting

try {
  AmpThemeRouting = require('src/themes/default-amp/router')
} catch (err) {
  AmpThemeRouting = null
}

export default AmpThemeRouting
