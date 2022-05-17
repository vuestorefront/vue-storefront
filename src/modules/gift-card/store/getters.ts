import { GetterTree } from 'vuex';
import { currentStoreView } from '@vue-storefront/core/lib/multistore'

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
  currentStoreGiftCardTemplates (state): GiftCardTemplate[] {
    const { storeId } = currentStoreView();
    const currentStoreTemplateIds = state.giftCardTemplateIdsByStoreId[storeId];

    return (Object.values(state.giftCardTemplate) as GiftCardTemplate[])
      .filter((giftCardTemplate) => currentStoreTemplateIds.includes(giftCardTemplate.id));
  }
}
