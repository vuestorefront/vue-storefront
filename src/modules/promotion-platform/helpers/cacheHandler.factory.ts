import { Logger } from '@vue-storefront/core/lib/logger'
import { StorageManager } from '@vue-storefront/core/lib/storage-manager'
import RootState from 'core/types/RootState';
import { MutationPayload } from 'vuex';
import { CAMPAIGN_CONTENT, CAMPAIGN_TOKEN, LAST_BANNER_VERSION, PRODUCTION_SPOT_COUNTDOWN_EXPIRATION_DATE } from '../types/local-storage-key';

import PromotionPlatformState from '../types/PromotionPlatformState';
import * as types from '../types/StoreMutations'

export function cacheHandlerFactory () {
  return (mutation: MutationPayload, state: any) => {
    const type = mutation.type;

    const promotionPlatformStorage = StorageManager.get(types.SN_PROMOTION_PLATFORM);

    if (type.endsWith(types.SET_CAMPAIGN_TOKEN)) {
      return promotionPlatformStorage
        .setItem(CAMPAIGN_TOKEN, (state.promotionPlatform as PromotionPlatformState).campaignToken)
        .catch((reason) => {
          Logger.error(reason)()
        })
    }

    if (type.endsWith(types.SET_LAST_BANNER_VERSION_CLOSED_BY_USER)) {
      return promotionPlatformStorage
        .setItem(LAST_BANNER_VERSION, (state.promotionPlatform as PromotionPlatformState).lastClosedBannerVersionByUser)
        .catch((reason) => {
          Logger.error(reason)()
        })
    }

    if (type.endsWith(types.SET_PRODUCTION_SPOT_COUNTDOWN_EXPIRATION_DATE)) {
      return promotionPlatformStorage
        .setItem(PRODUCTION_SPOT_COUNTDOWN_EXPIRATION_DATE, (state.promotionPlatform as PromotionPlatformState).productionSpotCountdownExpirationDate)
        .catch((reason) => {
          Logger.error(reason)()
        })
    }

    if (type.endsWith(types.CLEAR_PRODUCTION_SPOT_COUNTDOWN_EXPIRATION_DATE)) {
      return promotionPlatformStorage
        .removeItem(PRODUCTION_SPOT_COUNTDOWN_EXPIRATION_DATE)
        .catch((reason) => {
          Logger.error(reason)()
        })
    }

    if (type.endsWith(types.SET_CAMPAIGN_CONTENT)) {
      const value = (state.promotionPlatform as PromotionPlatformState).campaignContent;

      if (!value) {
        return promotionPlatformStorage.removeItem(CAMPAIGN_CONTENT);
      }

      return promotionPlatformStorage
        .setItem(CAMPAIGN_CONTENT, value.toPlainObject())
        .catch((reason) => {
          Logger.error(reason)()
        })
    }

    if (type.endsWith(types.CLEAR_PRODUCTION_SPOT_COUNTDOWN_EXPIRATION_DATE)) {
      return StorageManager
        .get(types.SN_PROMOTION_PLATFORM)
        .removeItem('production-spot-countdown-expiration-date')
        .catch((reason) => {
          Logger.error(reason)()
        })
    }
  }
}
