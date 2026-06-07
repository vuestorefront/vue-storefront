import { GetterTree } from 'vuex';

import RootState from '@vue-storefront/core/types/RootState';

import { TouchData } from '../types/traffic-attribution.interface';
import { TrafficAttributionState } from '../types/state.interface';
import { GET_FIRST_TOUCH, GET_LAST_TOUCH } from '../types/getters';

export const getters: GetterTree<TrafficAttributionState, RootState> = {
  [GET_FIRST_TOUCH] (state): TouchData | null {
    return state.firstTouch;
  },
  [GET_LAST_TOUCH] (state): TouchData | null {
    return state.lastTouch;
  }
};
