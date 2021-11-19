import { GetterTree } from 'vuex';

import GiftCard from '../types/GiftCard';
import GiftCardState from '../types/GiftCardState';
import GiftCardTemplate from '../types/GiftCardTemplate.interface';

export const getters: GetterTree<GiftCardState, any> = {
  appliedGiftCards (state): GiftCard[] {
    return Object.values(state.appliedGiftCard);
  },
  getGiftCardTemplateById (state): (id: number) => GiftCardTemplate {
    return (id) => state.giftCardTemplate[id];
  },
  giftCardTemplates (state): GiftCardTemplate[] {
    return Object.values(state.giftCardTemplate);
  }
}
