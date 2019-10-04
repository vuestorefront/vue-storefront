import { GetterTree } from 'vuex'
import TeaserState, { TeaserStateItem } from '../types/TeaserState'
import RootState from '@vue-storefront/core/types/RootState'
import { Logger } from '@vue-storefront/core/lib/logger'

const getters: GetterTree<TeaserState, RootState> = {
  getTeasers: (state) => state.items
}

export default getters
