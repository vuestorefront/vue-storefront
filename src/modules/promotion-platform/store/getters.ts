import { GetterTree } from 'vuex';

import PromotionPlatformState from '../types/PromotionPlatformState';

export const getters: GetterTree<PromotionPlatformState, any> = {
  campaignContent (state): string {
    return state.campaignContent;
  },
  lastClosedByUserBannerVersion (state): string {
    return state.lastClosedByUserBannerVersion;
  }
}
