import config from 'config'
import { removeProtocool, getNormalizedPath, getUrl } from './helpers'
import { getExtendedStoreviewConfig } from '.'
import { removeStoreCodeFromRoute } from '@vue-storefront/core/lib/multistore';

const isEqualUrl = (url, storeView) => getNormalizedPath(url) === storeView.url || url === storeView.url

const removeLocalization = (matchedRouteOrUrl): string => {
  let url = getUrl(matchedRouteOrUrl)

  for (let storeViewProp of config.storeViews.mapStoreUrlsFor) {
    const storeView = getExtendedStoreviewConfig(config.storeViews[storeViewProp])

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
