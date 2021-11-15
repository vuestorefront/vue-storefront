import config from 'config'
import { processURLAddress } from '@vue-storefront/core/helpers'
import { TaskQueue } from '@vue-storefront/core/lib/sync';

import GiftCard from './types/GiftCard';
import GiftCardTemplate from './types/GiftCardTemplate.interface';

function getQueryString (cartId?: string, userToken?: string) {
  const query = new URLSearchParams();

  if (cartId) {
    query.append('cartId', cartId);
  }

  if (userToken) {
    query.append('token', userToken)
  }

  return query.toString();
}

export const GiftCardService = {
  async applyGiftCardCode (code: string, cartId?: string, userToken?: string): Promise<GiftCard> {
    let url = processURLAddress(`${config.budsies.endpoint}/giftcards/apply`);
    const queryString = getQueryString(cartId, userToken);

    if (queryString) {
      url += `?${queryString}`;
    }

    const result = await TaskQueue.execute({
      url,
      payload: {
        headers: { 'Accept': 'application/json' },
        mode: 'cors',
        method: 'POST',
        body: JSON.stringify({ code })
      },
      silent: true
    });

    return {
      code,
      value: result.result // todo check
    }
  },
  async changeAppliedGiftCardValue (
    code: string,
    value: number,
    cartId?: string,
    userToken?: string
  ): Promise<GiftCard> {
    let url = processURLAddress(`${config.budsies.endpoint}/giftcards/changeValue`);
    const queryString = getQueryString(cartId, userToken);

    if (queryString) {
      url += `?${queryString}`;
    }

    const result = await TaskQueue.execute({
      url,
      payload: {
        headers: { 'Accept': 'application/json' },
        mode: 'cors',
        method: 'POST',
        body: JSON.stringify({ code, value })
      },
      silent: true
    });

    return {
      code,
      value: result.result // todo check
    }
  },
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
  },
  async removeAppliedGiftCard (code: string, cartId?: string, userToken?: string): Promise<void> {
    let url = processURLAddress(`${config.budsies.endpoint}/giftcards/remove`);
    const queryString = getQueryString(cartId, userToken);

    if (queryString) {
      url += `?${queryString}`;
    }

    await TaskQueue.execute({
      url,
      payload: {
        headers: { 'Accept': 'application/json' },
        mode: 'cors',
        method: 'POST',
        body: JSON.stringify({ code })
      },
      silent: true
    });
  }
}
