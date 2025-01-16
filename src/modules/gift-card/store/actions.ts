import Vue from 'vue';
import { currentStoreView } from '@vue-storefront/core/lib/multistore';
import { Dictionary } from 'src/modules/budsies';
import { ActionTree } from 'vuex';

import { GiftCardService } from '../gift-card.service';
import GiftCard from '../types/GiftCard';
import GiftCardState from '../types/GiftCardState';
import GiftCardTemplate from '../types/GiftCardTemplate.interface';
import { REMOVE_APPLIED_GIFT_CARD, SET_APPLIED_GIFT_CARD, SET_APPLIED_GIFT_CARDS, SET_IS_GIFT_CARD_PROCESSING, UPDATE_GIFT_CARD_TEMPLATE, UPDATE_GIFT_CARD_TEMPLATE_IDS_BY_STORE_ID } from '../types/StoreMutations';

export const actions: ActionTree<GiftCardState, any> = {
  async applyGiftCardCode ({ commit, dispatch, rootGetters }, payload: string): Promise<GiftCard> {
    const cartId = rootGetters['cart/getCartToken'];
    const userToken = rootGetters['user/getToken'];
    let giftCard: GiftCard | undefined;

    commit(SET_IS_GIFT_CARD_PROCESSING, true);

    try {
      giftCard = await GiftCardService.applyGiftCardCode(payload, cartId, userToken);
      await dispatch('cart/syncTotals', { forceServerSync: true }, { root: true });
    } finally {
      commit(SET_IS_GIFT_CARD_PROCESSING, false);
    }

    if (giftCard) {
      commit(SET_APPLIED_GIFT_CARD, giftCard);
    }

    return giftCard;
  },
  async changeAppliedGiftCardValue (
    { commit, dispatch, rootGetters },
    { code, value }: { code: string, value: number }
  ): Promise<void> {
    const cartId = rootGetters['cart/getCartToken'];
    const userToken = rootGetters['user/getToken'];

    commit(SET_IS_GIFT_CARD_PROCESSING, true);

    try {
      const giftCard = await GiftCardService.changeAppliedGiftCardValue(
        code,
        value,
        cartId,
        userToken
      );
      await dispatch('cart/syncTotals', { forceServerSync: true }, { root: true });
      commit(SET_APPLIED_GIFT_CARD, giftCard);
    } finally {
      commit(SET_IS_GIFT_CARD_PROCESSING, false);
    }
  },
  async loadGiftCardsTemplates ({ commit, rootGetters }): Promise<Dictionary<GiftCardTemplate>> {
    if (Vue.prototype.$cacheTags) {
      Vue.prototype.$cacheTags.add(`gift_card_templates`);
    }

    const { storeId } = currentStoreView();
    const token = rootGetters['user/getToken'];
    const giftCardTemplates = await GiftCardService.loadGiftCardsTemplates(storeId, token);

    const dictionary: Dictionary<GiftCardTemplate> = {};

    giftCardTemplates.forEach((template) => {
      dictionary[template.id] = template;
      commit(UPDATE_GIFT_CARD_TEMPLATE, template);
    });

    commit(
      UPDATE_GIFT_CARD_TEMPLATE_IDS_BY_STORE_ID,
      {
        storeId,
        giftCardTemplatesIds: giftCardTemplates.map(({ id }) => id)
      }
    )

    return dictionary;
  },
  async pullAppliedGiftCards ({ commit, rootGetters }): Promise<void> {
    const cartId = rootGetters['cart/getCartToken'];
    const userToken = rootGetters['user/getToken'];
    let giftCards: GiftCard[] = [];

    commit(SET_IS_GIFT_CARD_PROCESSING, true);

    try {
      giftCards = await GiftCardService.pullAppliedGiftCards(cartId, userToken);
    } finally {
      commit(SET_IS_GIFT_CARD_PROCESSING, false);
    }

    commit(SET_APPLIED_GIFT_CARDS, giftCards);
  },
  async removeAppliedGiftCard ({ commit, dispatch, rootGetters }, giftCardCodes: string[]): Promise<void> {
    const cartId = rootGetters['cart/getCartToken'];
    const userToken = rootGetters['user/getToken'];

    commit(SET_IS_GIFT_CARD_PROCESSING, true);

    try {
      await GiftCardService.removeAppliedGiftCards(giftCardCodes, cartId, userToken);
      await dispatch('cart/syncTotals', { forceServerSync: true }, { root: true });
    } finally {
      commit(SET_IS_GIFT_CARD_PROCESSING, false);
    }

    giftCardCodes.forEach((code) => commit(REMOVE_APPLIED_GIFT_CARD, code));
  }
}
