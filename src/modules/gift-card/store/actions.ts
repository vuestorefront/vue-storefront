import { ActionTree } from 'vuex';

import { GiftCardService } from '../gift-card.service';
import GiftCardState from '../types/GiftCardState';
import { SET_APPLIED_GIFT_CARD } from '../types/StoreMutations';

export const actions: ActionTree<GiftCardState, any> = {
  async applyGiftCardCode ({ commit, rootGetters }, payload: string): Promise<void> {
    const cartId = rootGetters['cart/getCartToken'];
    const userToken = rootGetters['user/getToken'];
    const giftCard = await GiftCardService.applyGiftCardCode(payload, cartId, userToken);

    if (giftCard) {
      commit(SET_APPLIED_GIFT_CARD, giftCard);
    }
  },
  async changeAppliedGiftCardValue (
    { commit, rootGetters },
    { code, value }: { code: string, value: number }
  ): Promise<void> {
    const cartId = rootGetters['cart/getCartToken'];
    const userToken = rootGetters['user/getToken'];
    const giftCard = await GiftCardService.changeAppliedGiftCardValue(
      code,
      value,
      cartId,
      userToken
    );

    commit(SET_APPLIED_GIFT_CARD, giftCard);
  },
  async removeAppliedGiftCard ({ commit, getters, rootGetters }): Promise<void> {
    const cartId = rootGetters['cart/getCartToken'];
    const userToken = rootGetters['user/getToken'];
    const appliedGiftCard = getters['appliedGiftCard'];

    await GiftCardService.removeAppliedGiftCard(appliedGiftCard ? appliedGiftCard.code : '', cartId, userToken);

    commit(SET_APPLIED_GIFT_CARD, undefined);
  }
}
