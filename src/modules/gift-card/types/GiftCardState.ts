import { Dictionary } from 'src/modules/budsies';

import GiftCard from './GiftCard';
import GiftCardTemplate from './GiftCardTemplate.interface';

export default interface GiftCardState {
  appliedGiftCard: Dictionary<GiftCard>,
  giftCardTemplate: Dictionary<GiftCardTemplate>,
  giftCardTemplateIdsByStoreId: Dictionary<number[]>
}
