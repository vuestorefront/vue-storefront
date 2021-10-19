import { GetterTree } from 'vuex';
import CampaignContent from '../types/CampaignContent.model';

import PromotionPlatformState from '../types/PromotionPlatformState';

export const getters: GetterTree<PromotionPlatformState, any> = {
  campaignContent (state): CampaignContent | undefined {
    return state.campaignContent;
  },
  campaignToken (state): string | undefined {
    return state.campaignToken;
  }
}
