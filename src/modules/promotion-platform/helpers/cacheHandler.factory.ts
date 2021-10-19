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
  }
}
