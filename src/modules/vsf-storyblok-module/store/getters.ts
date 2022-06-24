import { GetterTree } from 'vuex'
import RootState from '@vue-storefront/core/types/RootState'

import { StoryblokState } from '../types/State'

const getters: GetterTree<StoryblokState, RootState> = {
  storeCode: (state: StoryblokState): string => {
    return state.storeCode;
  },
  supportsWebp (state: StoryblokState): boolean {
    return state.supportsWebp
  }
}

export default getters
