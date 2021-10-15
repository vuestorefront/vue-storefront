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
    let query = new URLSearchParams();

    if (campaignToken) {
      query.append('campaignToken', campaignToken)
    }

    if (dataParam) {
      query.append('data', dataParam);
    }

    const content = await PromotionPlatformService.fetchCampaignContent(query.toString());
    commit(types.SET_CAMPAIGN_CONTENT, content.campaignContent);
    commit(types.SET_CAMPAIGN_TOKEN, content.campaignToken);
  },
  async synchronize ({ commit }): Promise<void> {
    const promotionPlatformStorage = StorageManager.get(types.SN_PROMOTION_PLATFORM);
    const campaignToken = await promotionPlatformStorage.getItem('campaign-token');

    if (campaignToken) {
      commit(types.SET_CAMPAIGN_TOKEN, campaignToken);
      Logger.info('Campaign Token received from cache.', 'cache', campaignToken)()
    }

    EventBus.$emit('promotion-platform-store-synchronized')
  }
}
