import { storeViews } from 'config'
import { removeProtocool, getNormalizedPath, getUrl } from './helpers'
import { getExtendedStoreviewConfig } from '.'
import { removeStoreCodeFromRoute } from '@vue-storefront/core/lib/multistore'
import { LocalizedRoute, StoreView } from './../types'

const isEqualUrl = (url: LocalizedRoute | string, storeView: StoreView): boolean => getNormalizedPath(url) === storeView.url || url === storeView.url

const removeLocalization = (matchedRouteOrUrl: LocalizedRoute | string): LocalizedRoute | string => {
  const { multistore, mapStoreUrlsFor = [] } = storeViews
  if (!matchedRouteOrUrl || !multistore) return matchedRouteOrUrl

  let url = getUrl(matchedRouteOrUrl)

  for (let storeViewProp of mapStoreUrlsFor) {
    const storeView = getExtendedStoreviewConfig(storeViews[storeViewProp])

    if (!storeView) continue

    // base tranformation
    url = removeProtocool(url)

    if (storeView.appendStoreCode) {
      // legacy
      url = removeStoreCodeFromRoute(url) as string
    } else {
      url = isEqualUrl(url, storeView) ? '' : url.replace(new RegExp(`^${storeView.url}/`, 'g'), '')
    }
  }

  return getNormalizedPath(url) === getNormalizedPath(matchedRouteOrUrl) ? url : getNormalizedPath(url)
}

export default removeLocalization
