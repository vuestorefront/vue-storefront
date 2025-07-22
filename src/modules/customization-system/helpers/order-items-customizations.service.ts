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

export async function saveOrderItemCustomizationsState (payload: DraftOrderItem, userToken: string): Promise<void> {
  const url = `${config.budsies.endpoint}/customizations/order-items/states?token=${userToken}`;

  const response = await postRequest(url, JSON.stringify(payload));

  if (response.status !== 200) {
    throw new Error(`Failed to save order item customizations state`);
  }
}

export async function submitOrderItemCustomizationsState (
  payload: { order_item_id: string },
  userToken: string
): Promise<void> {
  const url = `${config.budsies.endpoint}/customizations/order-items/submit-requests?token=${userToken}`;

  const response = await postRequest(url, JSON.stringify(payload));

  if (response.status !== 200) {
    throw new Error(`Failed to submit order item customizations state`);
  }
}
