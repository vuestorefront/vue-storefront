import Vue from 'vue';
import { MutationTree } from 'vuex';

import EventBus from '@vue-storefront/core/compatibility/plugins/event-bus'

import { CampaignContent } from '../types/CampaignContent.interface';
import PromotionPlatformState from '../types/PromotionPlatformState';
import * as types from '../types/StoreMutations';
import { CAMPAIGN_CONTENT_CHANGED } from '../types/campaign-content-changed.event';

export const mutations: MutationTree<PromotionPlatformState> = {
  [types.SET_CAMPAIGN_CONTENT] (state, payload?: CampaignContent) {
    Vue.set(state, 'campaignContent', payload)
    EventBus.$emit(CAMPAIGN_CONTENT_CHANGED, payload);
  },
  [types.SET_CAMPAIGN_TOKEN] (state, payload?: string) {
    Vue.set(state, 'campaignToken', payload)
  },
  [types.SET_IS_SYNCED] (state, payload: boolean) {
    state.isSynced = payload;
  },
  [types.SET_LAST_BANNER_VERSION_CLOSED_BY_USER] (state, payload?: string) {
    Vue.set(state, 'lastClosedBannerVersionByUser', payload)
  },
  [types.SET_PRODUCTION_SPOT_COUNTDOWN_EXPIRATION_DATE] (state, payload?: number) {
    Vue.set(state, 'productionSpotCountdownExpirationDate', payload);
  },
  [types.CLEAR_PRODUCTION_SPOT_COUNTDOWN_EXPIRATION_DATE] (state) {
    Vue.set(state, 'productionSpotCountdownExpirationDate', undefined);
  }
}
