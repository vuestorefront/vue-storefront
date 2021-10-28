import config from 'config'
import { TaskQueue } from '@vue-storefront/core/lib/sync';
import { processURLAddress } from '@vue-storefront/core/helpers'

import GiftCardTemplate from './types/GiftCardTemplate.interface';

export const GiftCardService = {
  async loadGiftCardsTemplates (): Promise<GiftCardTemplate[]> {
    const url = processURLAddress(`${config.budsies.endpoint}/giftcards/templates`);

    const result = await TaskQueue.execute({
      url,
      payload: {
        headers: { 'Accept': 'application/json' },
        mode: 'cors',
        method: 'GET'
      },
      silent: true
    });

    return result.result;
  }
}
