import { MutationTree } from 'vuex';
import PromotionPlatformState from '../types/PromotionPlatformState';
import * as types from '../types/StoreMutations';

export const mutations: MutationTree<PromotionPlatformState> = {
  [types.SET_CAMPAIGN_CONTENT] (state, payload: string) {
    state.campaignContent = payload;
  },
  [types.SET_CAMPAIGN_TOKEN] (state, payload: string) {
    state.campaignToken = payload;
  }
}
