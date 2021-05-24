import { GetterTree } from 'vuex'
import RootState from '@vue-storefront/core/types/RootState'
import { BudsiesState } from '../types/State'
import Addon from '../models/addon.model'

const getters: GetterTree<BudsiesState, RootState> = {
  getAddon: (state: BudsiesState, id: string): Addon | undefined => {
    return state.addons[id];
  },
  getPrintedProductAddons: (state: BudsiesState) => (id: string) => {
    const result: Addon[] = [];

    state.printedProductAddons[id].forEach((id) => {
      result.push(state.addons[id]);
    });

    return result;
  }
}

export default getters
