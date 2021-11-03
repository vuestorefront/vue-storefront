import Vue from 'vue';
import { MutationTree } from 'vuex';

import GiftCard from '../types/GiftCard';
import GiftCardState from '../types/GiftCardState';
import * as types from '../types/StoreMutations'

export const mutations: MutationTree<GiftCardState> = {
  [types.SET_APPLIED_GIFT_CARD] (state, value: GiftCard) {
    Vue.set(state, 'appliedGiftCard', value)
  }
}
