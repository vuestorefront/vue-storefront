import merge from 'lodash-es/merge'

/** DEPRECIATED will be removed in 1.7 */
export function extendStore (coreStore, extendStore) {
  return merge(coreStore, extendStore)
}

export function registerTheme (themeName, app, routes, store, config, ssrContext) {
  let themeEntryPoint = require('theme/index.js')
  if (themeEntryPoint != null && themeEntryPoint.hasOwnProperty('default')) {
    themeEntryPoint.default(app, routes, store, config, ssrContext) // register theme
  } else {
    throw new Error('Wrong theme name: ' + themeName)
  }
}
