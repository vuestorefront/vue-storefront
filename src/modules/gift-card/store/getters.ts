import { GetterTree } from 'vuex';

import GiftCardState from '../types/GiftCardState';
import GiftCardTemplate from '../types/GiftCardTemplate.interface';

export const getters: GetterTree<GiftCardState, any> = {
  getGiftCardTemplateById (state): (id: number) => GiftCardTemplate {
    return (id) => state.giftCardTemplate[id];
  },
  giftCardTemplates (state): GiftCardTemplate[] {
    return Object.values(state.giftCardTemplate);
  }
}
