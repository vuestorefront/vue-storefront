import { GetterTree } from 'vuex'
import RootState from '@vue-storefront/core/types/RootState'
import { BudsiesState } from '../types/State'
import Addon from '../models/addon.model'
import Bodypart from '../models/bodypart.model'
import BodypartValue from '../models/bodypart-value.model'

const getters: GetterTree<BudsiesState, RootState> = {
  getAddon: (state: BudsiesState, id: string): Addon | undefined => {
    return state.addons[id];
  },
  getPrintedProductAddons: (state: BudsiesState) => (id: string) => {
    const result: Addon[] = [];

    if (!state.printedProductAddons[id] || !state.printedProductAddons[id].length) {
      return result;
    }

    state.printedProductAddons[id].forEach((id) => {
      result.push(state.addons[id]);
    });

    return result;
  },
  getProductBodyparts: (state: BudsiesState) => (id: string) => {
    const result: Bodypart[] = [];

    if (!state.productBodyparts[id] || !state.productBodyparts[id].length) {
      return result;
    }

    state.productBodyparts[id].forEach((id) => {
      result.push(state.bodyparts[id]);
    });

    return result;
  },
  getBodypartBodypartsValues: (state: BudsiesState) => (id: string) => {
    const result: BodypartValue[] = [];

    if (!state.bodypartBodypartsValues[id] || !state.bodypartBodypartsValues[id].length) {
      return result;
    }

    state.bodypartBodypartsValues[id].forEach((id) => {
      result.push(state.bodypartsValues[id]);
    });

    return result;
  },
  getCurrentPlushieId: (state: BudsiesState): string | undefined => {
    return state.currentPlushieId;
  }
}

export default getters
