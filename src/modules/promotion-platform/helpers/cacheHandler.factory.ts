import { Logger } from '@vue-storefront/core/lib/logger'
import { StorageManager } from '@vue-storefront/core/lib/storage-manager'

import PromotionPlatformState from '../types/PromotionPlatformState';
import * as types from '../types/StoreMutations'

export function cacheHandlerFactory () {
  return (mutation, state) => {
    const type = mutation.type;

    if (type.endsWith(types.SET_CAMPAIGN_TOKEN)) {
      return StorageManager
        .get(types.SN_PROMOTION_PLATFORM)
        .setItem('campaign-token', (state.promotionPlatform as PromotionPlatformState).campaignToken)
        .catch((reason) => {
          Logger.error(reason)()
        })
    }

    if (type.endsWith(types.SET_LAST_BANNER_VERSION_CLOSED_BY_USER)) {
      return StorageManager
        .get(types.SN_PROMOTION_PLATFORM)
        .setItem('last-closed-by-user-version', (state.promotionPlatform as PromotionPlatformState).lastClosedBannerVersionByUser)
        .catch((reason) => {
          Logger.error(reason)()
        })
    }

    if (type.endsWith(types.SET_PRODUCTION_SPOT_COUNTDOWN_EXPIRATION_DATE)) {
      return StorageManager
        .get(types.SN_PROMOTION_PLATFORM)
        .setItem('production-spot-countdown-expiration-date', (state.promotionPlatform as PromotionPlatformState).productionSpotCountdownExpirationDate)
        .catch((reason) => {
          Logger.error(reason)()
        })
    }
  }
}
