import { currentStoreView } from '@vue-storefront/core/lib/multistore';
import { Dictionary } from 'src/modules/budsies';
import { ActionTree } from 'vuex';

import { GiftCardService } from '../gift-card.service';
import GiftCardState from '../types/GiftCardState';
import GiftCardTemplate from '../types/GiftCardTemplate.interface';
import { UPDATE_GIFT_CARD_TEMPLATE } from '../types/StoreMutations';

export const actions: ActionTree<GiftCardState, any> = {
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
  }
}
