const _merge = require('lodash.merge')

export function corePage (path) {
  return require('core_pages/' + path + '.vue') // using webpack path alias  - core_pages = src/pages
}

export function coreComponent (path) {
  return require('core_components/' + path + '.vue') // using webpack path alias  - core_pages = src/components
}

export function coreStore (path) {
  return require('core_stores/' + path + '.js') // using webpack path alias  - core_stores = src/stores
}

export function extendStore (coreStore, extendStore) {
  return _merge(coreStore.default, extendStore)
}

export function registerTheme (themeName, app, routes, store) {
  let themeEntryPoint = require('core_themes/' + themeName + '/index.js')
  if (themeEntryPoint != null && themeEntryPoint.hasOwnProperty('default')) {
    themeEntryPoint.default(app, routes, store) // register theme
  } else {
    throw new Error('Wrong theme name: ' + themeName)
  }
}
