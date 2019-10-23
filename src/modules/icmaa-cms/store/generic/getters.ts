import { GetterTree } from 'vuex'
import GenericState, { GenericStateItem } from '../../types/GenericState'
import RootState from '@vue-storefront/core/types/RootState'

const getters = (stateKey: string): GetterTree<GenericState, RootState> => {
  return {
    getAll: (state): GenericStateItem[] => state.items
  }
}

export default getters
