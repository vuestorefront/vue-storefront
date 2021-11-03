import { GetterTree } from 'vuex';
import GiftCard from '../types/GiftCard';

import GiftCardState from '../types/GiftCardState';

export const getters: GetterTree<GiftCardState, any> = {
  appliedGiftCard (state): GiftCard | undefined {
    return state.appliedGiftCard;
  }
}
