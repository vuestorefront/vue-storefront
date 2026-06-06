import { MutationTree } from 'vuex';

import { TouchData } from '../types/traffic-attribution.interface';
import { TrafficAttributionState } from '../types/state.interface';
import {
  SET_FIRST_TOUCH,
  SET_LAST_TOUCH,
  MARK_FIRST_TOUCH_SENT,
  MARK_LAST_TOUCH_SENT,
  CLEAR_FIRST_TOUCH,
  CLEAR_LAST_TOUCH
} from '../types/mutations';

export const mutations: MutationTree<TrafficAttributionState> = {
  [SET_FIRST_TOUCH] (state, touch: TouchData) {
    state.firstTouch = touch;
  },
  [SET_LAST_TOUCH] (state, touch: TouchData) {
    state.lastTouch = touch;
  },
  [MARK_FIRST_TOUCH_SENT] (state) {
    if (state.firstTouch) {
      state.firstTouch.isSent = true;
    }
  },
  [MARK_LAST_TOUCH_SENT] (state) {
    if (state.lastTouch) {
      state.lastTouch.isSent = true;
    }
  },
  [CLEAR_FIRST_TOUCH] (state) {
    state.firstTouch = null;
  },
  [CLEAR_LAST_TOUCH] (state) {
    state.lastTouch = null;
  }
};
