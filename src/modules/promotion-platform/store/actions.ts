import { ActionTree } from 'vuex';

import { PromotionPlatformService } from '../promotion-platform.service';
import PromotionPlatformState from '../types/PromotionPlatformState';

export const actions: ActionTree<PromotionPlatformState, any> = {
  async fetchCampaignContent ({ commit }): Promise<void> {
    const content = await PromotionPlatformService.fetchCampaignContent();
    commit('setCampaignContent', content);
  }
}
