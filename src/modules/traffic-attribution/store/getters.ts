import { GetterTree } from 'vuex';

import RootState from '@vue-storefront/core/types/RootState';

import { TrafficAttributionData } from '../types/traffic-attribution.interface';
import { TrafficAttributionState } from '../types/state.interface';
import { GET_TRAFFIC_ATTRIBUTION, GET_LAST_MEANINGFUL_TRAFFIC_ATTRIBUTION } from '../types/getters';

export const getters: GetterTree<TrafficAttributionState, RootState> = {
  [GET_TRAFFIC_ATTRIBUTION] (state): TrafficAttributionData | null {
    return state.trafficAttribution;
  },
  [GET_LAST_MEANINGFUL_TRAFFIC_ATTRIBUTION] (state): TrafficAttributionData | null {
    return state.lastMeaningfulTrafficAttribution;
  }
};
