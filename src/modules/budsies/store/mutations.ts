import Vue from 'vue'
import { MutationTree } from 'vuex'
import ExtraPhotoAddon from '../models/extra-photo-addon.model'
import RushAddon from '../models/rush-addon.model'
import BodypartValue from '../models/bodypart-value.model';
import Bodypart from '../models/bodypart.model';
import { BudsiesState } from '../types/State'
import * as types from './mutation-types';

export const mutations: MutationTree<BudsiesState> = {
  setAddon (state: BudsiesState, { key, addon }: { key: string, addon: ExtraPhotoAddon }) {
    Vue.set(state.extraPhotoAddons, key, addon);
  },
  setPlushieBreeds (state: BudsiesState, items: string[]) {
    state.breeds = [...items];
  },
  setRushAddon (state: BudsiesState, { key, addon }: { key: string, addon: RushAddon }) {
    Vue.set(state.rushAddons, key, addon);
  },
  setPrintedProductAddons (state: BudsiesState, { key, addons }: { key: string, addons: ExtraPhotoAddon[] }) {
    const ids: string[] = [];

    addons.forEach((item) => {
      ids.push(item.id);
      Vue.set(state.extraPhotoAddons, item.id, item);
    });

    Vue.set(state.productExtraPhotoAddons, key, ids);
  },
  setProductRushAddons (state: BudsiesState, { key, addons }: { key: string, addons: RushAddon[] }) {
    const ids: string[] = [];

    addons.forEach((item) => {
      ids.push(item.id);
      Vue.set(state.rushAddons, item.id, item);
    });

    Vue.set(state.productRushAddons, key, ids);
  },
  setBodypart (state: BudsiesState, { key, bodypart }: { key: string, bodypart: Bodypart }) {
    Vue.set(state.bodyparts, key, bodypart);
  },
  setBodypartValue (state: BudsiesState, { key, bodypartValue }: { key: string, bodypartValue: BodypartValue }) {
    Vue.set(state.bodypartsValues, key, bodypartValue);
  },
  setBodypartBodypartsValues (state: BudsiesState, { key, values }: { key: string, values: BodypartValue[] }) {
    const ids: string[] = [];

    values.forEach((item) => {
      ids.push(item.id);
      Vue.set(state.bodypartsValues, item.id, item);
    });

    Vue.set(state.bodypartBodypartsValues, key, ids);
  },
  setProductBodyparts (state: BudsiesState, { key, bodyparts }: { key: string, bodyparts: Bodypart[] }) {
    const ids: string[] = [];

    bodyparts.forEach((item) => {
      ids.push(item.id);
      Vue.set(state.bodyparts, item.id, item);
    });

    Vue.set(state.productBodyparts, key, ids);
  },
  setPlushieShortcode (state: BudsiesState, { key, shortcode }: { key: string, shortcode: string }) {
    Vue.set(state.plushieShortcode, key, shortcode);
  },
  [types.CUSTOMER_EMAIL_SET] (state: BudsiesState, { email }: { email: string }) {
    Vue.set(state, 'customerEmail', email);
  }
}
