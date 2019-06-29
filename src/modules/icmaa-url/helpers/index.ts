import { LocalizedRoute } from '@vue-storefront/core/lib/multistore';
import { Logger } from '@vue-storefront/core/lib/logger';

export function removeHashFromRoute (matchedRouteOrUrl: LocalizedRoute | string): LocalizedRoute | string {
  let urlPath = typeof matchedRouteOrUrl === 'object' ? matchedRouteOrUrl.path : matchedRouteOrUrl
  return urlPath.replace(/#.*$/m, '')
}
