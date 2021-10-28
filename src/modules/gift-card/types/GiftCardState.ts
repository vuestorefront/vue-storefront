import { Dictionary } from 'src/modules/budsies';

import GiftCardTemplate from './GiftCardTemplate.interface';

export default interface GiftCardState {
  giftCardTemplate: Dictionary<GiftCardTemplate>
}
