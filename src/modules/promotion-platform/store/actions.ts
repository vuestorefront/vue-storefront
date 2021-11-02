import { ActionTree } from 'vuex';
import { StorageManager } from '@vue-storefront/core/lib/storage-manager'
import { Logger } from '@vue-storefront/core/lib/logger'
import EventBus from '@vue-storefront/core/compatibility/plugins/event-bus'

import { PromotionPlatformService } from '../promotion-platform.service';
import PromotionPlatformState from '../types/PromotionPlatformState';
import * as types from '../types/StoreMutations';

export const actions: ActionTree<PromotionPlatformState, any> = {
  async fetchCampaignContent ({ commit, getters }, dataParam?: string): Promise<void> {
    const campaignToken = getters['campaignToken'];

    const content = await PromotionPlatformService.fetchCampaignContent(campaignToken, dataParam);

    commit(types.SET_CAMPAIGN_CONTENT, content.campaignContent);
    commit(types.SET_CAMPAIGN_TOKEN, content.campaignToken);
  },
  async synchronize ({ commit }): Promise<void> {
    const promotionPlatformStorage = StorageManager.get(types.SN_PROMOTION_PLATFORM);

    const [campaignToken, lastClosedBannerVersionByUser] = await Promise.all([
      promotionPlatformStorage.getItem('campaign-token'),
      promotionPlatformStorage.getItem('last-closed-by-user-version')
    ]);

    if (campaignToken) {
      commit(types.SET_CAMPAIGN_TOKEN, campaignToken);
      Logger.info('Campaign Token received from cache.', 'cache', campaignToken)()
    }

    if (lastClosedBannerVersionByUser) {
      commit(types.SET_LAST_BANNER_VERSION_CLOSED_BY_USER, lastClosedBannerVersionByUser);
      Logger.info('Last Version Closed By User received from cache.', 'cache', lastClosedBannerVersionByUser)()
    }

    EventBus.$emit('promotion-platform-store-synchronized')
  }
}
