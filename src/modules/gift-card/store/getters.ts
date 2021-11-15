import { GetterTree } from 'vuex';

import GiftCard from '../types/GiftCard';
import GiftCardState from '../types/GiftCardState';
import GiftCardTemplate from '../types/GiftCardTemplate.interface';

export const getters: GetterTree<GiftCardState, any> = {
  appliedGiftCard (state): GiftCard | undefined {
    return state.appliedGiftCard;
  },
  getGiftCardTemplateById (state): (id: number) => GiftCardTemplate {
    return (id) => state.giftCardTemplate[id];
  },
  giftCardTemplates (state): GiftCardTemplate[] {
    return Object.values(state.giftCardTemplate);
  }
}
