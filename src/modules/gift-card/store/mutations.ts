import Vue from 'vue';
import { MutationTree } from 'vuex';

import GiftCardState from '../types/GiftCardState';
import GiftCardTemplate from '../types/GiftCardTemplate.interface';
import * as types from '../types/StoreMutations'

export const mutations: MutationTree<GiftCardState> = {
  [types.UPDATE_GIFT_CARD_TEMPLATE] (state, giftCardTemplate: GiftCardTemplate) {
    Vue.set(state.giftCardTemplate, giftCardTemplate.id, giftCardTemplate)
  }
}
