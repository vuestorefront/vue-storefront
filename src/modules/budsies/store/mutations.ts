import Vue from 'vue'
import { MutationTree } from 'vuex'
import Addon from '../models/addon.model'
import { BudsiesState } from '../types/State'

export const mutations: MutationTree<BudsiesState> = {
  setAddon (state: BudsiesState, { key, addon }: { key: string, addon: Addon }) {
    Vue.set(state.addons, key, addon);
  },
  setPrintedProductAddons (state: BudsiesState, { key, addons }: { key: string, addons: Addon[] }) {
    const ids: string[] = [];

    addons.forEach((item) => {
      ids.push(item.id);
      Vue.set(state.addons, item.id, item);
    });

    Vue.set(state.printedProductAddons, key, ids);
  }
}
