import { MutationTree } from 'vuex';
import PromotionPlatformState from '../types/PromotionPlatformState';

export const mutations: MutationTree<PromotionPlatformState> = {
  setCampaignContent (state: PromotionPlatformState, payload: string) {
    state.campaignContent = payload;
  },
  setLastClosedByUserBannerVersion (state, payload: string) {
    state.lastClosedByUserBannerVersion = payload;
  }
}
