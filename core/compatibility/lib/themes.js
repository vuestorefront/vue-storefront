import merge from 'lodash-es/merge'
// depreciated for simplification
import * as corePlugins from '@vue-storefront/core/compatibility/plugins'
import * as coreMixins from '@vue-storefront/core/mixins'
import * as coreFilters from '@vue-storefront/core/filters'
import * as themeMixins from 'theme/mixins'
import * as themeFilters from 'theme/filters'

// STILL USED IN CORE

/** DEPRECIATED will be removed in 1.7 */
export function plugins () {
  return corePlugins
}

/** DEPRECIATED will be removed in 1.7 */
export function mixins () {
  return merge(coreMixins, themeMixins)
}

/** DEPRECIATED will be removed in 1.7 */
export function filters () {
  return merge(themeFilters, coreFilters)
}

/** DEPRECIATED will be removed in 1.7 */
export function extendStore (coreStore, extendStore) {
  return merge(coreStore, extendStore)
}
