import { MutationTree } from 'vuex';

import CampaignContent from '../types/CampaignContent.model';
import PromotionPlatformState from '../types/PromotionPlatformState';
import * as types from '../types/StoreMutations';

export const mutations: MutationTree<PromotionPlatformState> = {
  [types.SET_CAMPAIGN_CONTENT] (state, payload: CampaignContent) {
    state.campaignContent = payload;
  },
  [types.SET_CAMPAIGN_TOKEN] (state, payload: string) {
    state.campaignToken = payload;
  }
}
