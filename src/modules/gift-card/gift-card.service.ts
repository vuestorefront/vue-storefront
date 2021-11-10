import config from 'config'
import { processURLAddress } from '@vue-storefront/core/helpers'
import { TaskQueue } from '@vue-storefront/core/lib/sync';

import GiftCardTemplate from './types/GiftCardTemplate.interface';

export const GiftCardService = {
  async loadGiftCardsTemplates (storeId: number, userToken?: string): Promise<GiftCardTemplate[]> {
    let url = processURLAddress(`${config.budsies.endpoint}/giftcards/templates`);
    const query = new URLSearchParams();

    query.append('storeId', storeId.toString(10));

    if (userToken) {
      query.append('token', userToken)
    }

    url += `?${query.toString()}`;

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
