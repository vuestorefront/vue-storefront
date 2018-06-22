import merge from 'lodash-es/merge'
import messages from 'core/lib/translation.preprocessor'
import * as corePlugins from 'core/plugins'
import * as coreMixins from 'core/mixins'
import * as themeMixins from 'theme/mixins'
import * as coreFilters from 'core/filters'
import * as themeFilters from 'theme/filters'

/**
 * Return messages load from both: core/resource/i18n and theme/resource/i18n
 */
export function translations () {
  return messages
}

/**
 * Return plugins load from core/plugins. Theme ones are ommited due to config that needs to be passed
 */
export function plugins () {
  return corePlugins
}

/**
 * Return mixins load from both: core/mixins and theme/mixins
 */
export function mixins () {
  return merge(coreMixins, themeMixins)
}

/**
 * Return filters load from both: core/filters and theme/filters
 */
export function filters () {
  return merge(themeFilters, coreFilters)
}

export function extendStore (coreStore, extendStore) {
  return merge(coreStore, extendStore)
}

export function registerTheme (themeName, app, routes, store) {
  let themeEntryPoint = require('theme/index.js')
  if (themeEntryPoint != null && themeEntryPoint.hasOwnProperty('default')) {
    themeEntryPoint.default(app, routes, store) // register theme
  } else {
    throw new Error('Wrong theme name: ' + themeName)
  }
}
