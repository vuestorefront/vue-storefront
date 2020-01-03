import { ActionTree } from 'vuex';
import { StoreLocatorState } from '../types/storeLocator'

export const actions: ActionTree<StoreLocatorState, any> = {
  setStoreInfo ({state, commit}, action) {
    state.storeInfo = action === true
    commit('ui/setOverlay', !action);
  },
  setSelectedStore ({state}, action) {
    if (action) {
      state.selectedStore = action
    }
  }
}
