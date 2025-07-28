import fetch from 'isomorphic-fetch';
import config from 'config';

import { TaskQueue } from '@vue-storefront/core/lib/sync';
import EventBus from '@vue-storefront/core/compatibility/plugins/event-bus'

import { BEFORE_STORE_BACKEND_API_REQUEST } from 'src/modules/shared';

import { DraftOrderItem } from '../types/draft-order-item.interface';

async function postRequest (url: string, body: string): Promise<Response> {
  const mode: RequestMode = 'cors';
  const eventPayload = {
    url
  };

  EventBus.$emit(BEFORE_STORE_BACKEND_API_REQUEST, eventPayload);

  const requestPayload = {
    method: 'POST',
    headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
    mode,
    body
  }

  return fetch(url, requestPayload);
}

function getErrorMessages (
  result: any,
  defaultMessage: string,
  prefix: string
): string[] {
  const results = result?.result?.results || [];
  const errorItems = results.filter((item: any) => item.error_message);

  if (!errorItems.length) {
    return [defaultMessage];
  }

  return errorItems.map((errorItem: any) => {
    const errorMessage = errorItem.error_message || defaultMessage;
    return `${prefix}: ${errorMessage}`;
  });
}

export async function fetchOrderItemCustomizationsState (orderItemId: string): Promise<DraftOrderItem> {
  const url = `${config.budsies.endpoint}/customizations/order-items/states?token={{token}}&orderItemId=${orderItemId}`;

  const result = await TaskQueue.execute({
    url,
    payload: {
      headers: { 'Accept': 'application/json' },
      mode: 'cors',
      method: 'GET'
    }
  });

  if (result.code !== 200) {
    throw new Error(`Failed to fetch order item customizations state: ${result.result}`);
  }

  return result.result as DraftOrderItem;
}

export async function saveOrderItemCustomizationsState (orderItems: DraftOrderItem[], userToken: string): Promise<void> {
  const payload = {
    order_items: orderItems
  };

  const url = `${config.budsies.endpoint}/customizations/order-items/states?token=${userToken}`;

  const response = await postRequest(url, JSON.stringify(payload));
  const result = await response.json();

  if (response.status !== 200 || !result?.result?.success) {
    const messages = getErrorMessages(result, `Failed to save order item customizations state`, `Save State`);
    const error = { messages };

    throw error;
  }
}

export async function submitOrderItemCustomizationsState (
  orderItemIds: string[],
  userToken: string
): Promise<void> {
  const payload = {
    order_items: orderItemIds.map(id => ({ id }))
  };

  const url = `${config.budsies.endpoint}/customizations/order-items/submit-requests?token=${userToken}`;

  const response = await postRequest(url, JSON.stringify(payload));
  const result = await response.json();

  if (response.status !== 200 || !result?.result?.success) {
    const messages = getErrorMessages(result, `Failed to submit order item customizations state`, `Submit State`);
    const error = { messages };

    throw error;
  }
}
