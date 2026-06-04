import { MutationTree } from 'vuex';

import { TrafficAttributionData } from '../types/traffic-attribution.interface';
import { TrafficAttributionState } from '../types/state.interface';
import {
  SET_TRAFFIC_ATTRIBUTION,
  SET_LAST_MEANINGFUL_TRAFFIC_ATTRIBUTION,
  CLEAR_LAST_MEANINGFUL_TRAFFIC_ATTRIBUTION
} from '../types/mutations';

export const mutations: MutationTree<TrafficAttributionState> = {
  [SET_TRAFFIC_ATTRIBUTION] (state, attribution: TrafficAttributionData) {
    state.trafficAttribution = attribution;
  },
  [SET_LAST_MEANINGFUL_TRAFFIC_ATTRIBUTION] (state, attribution: TrafficAttributionData) {
    state.lastMeaningfulTrafficAttribution = attribution;
  },
  [CLEAR_LAST_MEANINGFUL_TRAFFIC_ATTRIBUTION] (state) {
    state.lastMeaningfulTrafficAttribution = null;
  }
};
