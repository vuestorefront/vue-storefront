import { MutationTree } from 'vuex'
import Addon from '../models/addon.model'
import { BudsiesState } from '../types/State'

export const mutations: MutationTree<BudsiesState> = {
  setAddon (state: BudsiesState, { key, addon }: { key: string, addon: Addon }) {
    state.addons[key] = addon;
  },
  setPrintedProductAddons (state: BudsiesState, { key, addons }: { key: string, addons: Addon[] }) {
    const ids: string[] = [];

    addons.forEach((item) => {
      ids.push(item.id);
      state.addons[item.id] = item;
    });

    state.printedProductAddons[key] = ids;
  }
}
