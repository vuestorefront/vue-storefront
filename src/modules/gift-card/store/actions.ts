import { currentStoreView } from '@vue-storefront/core/lib/multistore';
import { Dictionary } from 'src/modules/budsies';
import { ActionTree } from 'vuex';

import { GiftCardService } from '../gift-card.service';
import GiftCard from '../types/GiftCard';
import GiftCardState from '../types/GiftCardState';
import GiftCardTemplate from '../types/GiftCardTemplate.interface';
import { SET_APPLIED_GIFT_CARD, UPDATE_GIFT_CARD_TEMPLATE } from '../types/StoreMutations';

export const actions: ActionTree<GiftCardState, any> = {
  async applyGiftCardCode ({ commit, rootGetters }, payload: string): Promise<GiftCard> {
    const cartId = rootGetters['cart/getCartToken'];
    const userToken = rootGetters['user/getToken'];
    const giftCard = await GiftCardService.applyGiftCardCode(payload, cartId, userToken);

    if (giftCard) {
      commit(SET_APPLIED_GIFT_CARD, giftCard);
    }

    return giftCard;
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
  async loadGiftCardsTemplates ({ commit, rootGetters }): Promise<Dictionary<GiftCardTemplate>> {
    const { storeId } = currentStoreView();
    const token = rootGetters['user/getToken'];
    const giftCardTemplates = await GiftCardService.loadGiftCardsTemplates(storeId, token);

    const dictionary: Dictionary<GiftCardTemplate> = {};

    giftCardTemplates.forEach((template) => {
      dictionary[template.id] = template;
      commit(UPDATE_GIFT_CARD_TEMPLATE, template);
    });

    return dictionary;
  },
  async removeAppliedGiftCard ({ commit, getters, rootGetters }): Promise<void> {
    const cartId = rootGetters['cart/getCartToken'];
    const userToken = rootGetters['user/getToken'];
    const appliedGiftCard = getters['appliedGiftCard'];

    await GiftCardService.removeAppliedGiftCard(appliedGiftCard ? appliedGiftCard.code : '', cartId, userToken);

    commit(SET_APPLIED_GIFT_CARD, undefined);
  }
}
