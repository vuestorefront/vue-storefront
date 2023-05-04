import { ActionTree } from 'vuex';
import { StorageManager } from '@vue-storefront/core/lib/storage-manager'
import { Logger } from '@vue-storefront/core/lib/logger'
import EventBus from '@vue-storefront/core/compatibility/plugins/event-bus'

import { PromotionPlatformService } from '../promotion-platform.service';
import PromotionPlatformState from '../types/PromotionPlatformState';
import * as types from '../types/StoreMutations';

export const actions: ActionTree<PromotionPlatformState, any> = {
  async updateActiveCampaign ({ commit, getters }, data: { dataParam?: string, cartId?: string }): Promise<void> {
    const campaignToken = getters['campaignToken'];

    const content = await PromotionPlatformService.updateActiveCampaign(campaignToken, data.dataParam, data.cartId);

    commit(types.SET_CAMPAIGN_CONTENT, content.campaignContent);
    commit(types.SET_CAMPAIGN_TOKEN, content.campaignToken);
  },
  async fetchActiveCampaign (
    { commit },
    { cartId, userToken }: {cartId: string, userToken?: string}
  ): Promise<void> {
    const content = await PromotionPlatformService.fetchActiveCampaign(cartId, userToken);

    commit(types.SET_CAMPAIGN_CONTENT, content.campaignContent);
    commit(types.SET_CAMPAIGN_TOKEN, content.campaignToken);
  },
  async synchronize ({ commit }): Promise<void> {
    const promotionPlatformStorage = StorageManager.get(types.SN_PROMOTION_PLATFORM);

    const [campaignToken, lastClosedBannerVersionByUser, productionSpotCountdownExpirationDate] = await Promise.all([
      promotionPlatformStorage.getItem('campaign-token'),
      promotionPlatformStorage.getItem('last-closed-by-user-version'),
      promotionPlatformStorage.getItem('production-spot-countdown-expiration-date')
    ]);

    if (campaignToken) {
      commit(types.SET_CAMPAIGN_TOKEN, campaignToken);
      Logger.info('Campaign Token received from cache.', 'cache', campaignToken)()
    }

    if (lastClosedBannerVersionByUser) {
      commit(types.SET_LAST_BANNER_VERSION_CLOSED_BY_USER, lastClosedBannerVersionByUser);
      Logger.info('Last Version Closed By User received from cache.', 'cache', lastClosedBannerVersionByUser)()
    }

    if (productionSpotCountdownExpirationDate) {
      commit(types.SET_PRODUCTION_SPOT_COUNTDOWN_EXPIRATION_DATE, productionSpotCountdownExpirationDate);
      Logger.info('Production Spot Countdown Expiration Date received from cache.', 'cache', lastClosedBannerVersionByUser)()
    }

    EventBus.$emit('promotion-platform-store-synchronized')
  }
}
