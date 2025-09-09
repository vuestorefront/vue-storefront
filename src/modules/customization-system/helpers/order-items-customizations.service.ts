import fetch from 'isomorphic-fetch';
import config from 'config';

import { TaskQueue } from '@vue-storefront/core/lib/sync';
import EventBus from '@vue-storefront/core/compatibility/plugins/event-bus'

import { BEFORE_STORE_BACKEND_API_REQUEST } from 'src/modules/shared';

import { DraftOrderItem } from '../types/draft-order-item.interface';

export interface OrderItemsRequestResult {
  success: { orderItemId: string }[],
  errors: { orderItemId: string, errorMessage: string }[]
}

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

function getItemErrorMessage (
  item: any,
  defaultMessage: string,
  prefix: string
): string {
  const errorMessage = item?.error_message || defaultMessage;
  return `${prefix}: ${errorMessage}`;
}

function gerOrderItemsRequestResult (data: any, defaultErrorMessage: string): OrderItemsRequestResult {
  const result: OrderItemsRequestResult = {
    success: [],
    errors: []
  };

  for (const orderItemResult of data.result.results) {
    if (orderItemResult.error_message) {
      const errorMessage = getItemErrorMessage(orderItemResult, defaultErrorMessage, `Save State`);

      result.errors.push({
        orderItemId: orderItemResult.id,
        errorMessage
      });
      continue;
    }

    result.success.push({
      orderItemId: orderItemResult.id
    });
  }

  return result;
}

export async function fetchOrderItemsCustomizationsStates (orderItemIds: string[]): Promise<DraftOrderItem[]> {
  if (orderItemIds.length === 0) {
    return [];
  }

  const params = new URLSearchParams();

  params.append('orderItemId', orderItemIds.join(','));

  const url = `${config.budsies.endpoint}/customizations/order-items/states?token={{token}}&${params.toString()}`;

  const result = await TaskQueue.execute({
    url,
    payload: {
      headers: { 'Accept': 'application/json' },
      mode: 'cors',
      method: 'GET'
    }
  });

  if (result.code !== 200) {
    throw new Error(`Failed to fetch order items customizations states: ${result.result}`);
  }

  if (!result.result || result.result.length === 0) {
    throw new Error(`No order items customizations states found for orderItemIds: ${orderItemIds.join(', ')}`);
  }

  return result.result as DraftOrderItem[];
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

  if (!result.result || result.result.length === 0) {
    throw new Error(`No order item customizations state found for orderItemId: ${orderItemId}`);
  }

  return result.result[0] as DraftOrderItem;
}

export async function saveOrderItemCustomizationsState (
  orderItems: DraftOrderItem[],
  userToken: string
): Promise<OrderItemsRequestResult> {
  const payload = {
    order_items: orderItems.map((item) => {
      return {
        id: item.id,
        customization_state: item.customization_state
      }
    })
  };

  const url = `${config.budsies.endpoint}/customizations/order-items/states?token=${userToken}`;

  const response = await postRequest(url, JSON.stringify(payload));
  const data = await response.json();

  const defaultErrorMessage = `Failed to save order item customizations state`;

  if (response.status !== 200) {
    const errorMessage = data?.result?.error_message || defaultErrorMessage;

    throw new Error(errorMessage);
  }

  return gerOrderItemsRequestResult(data, defaultErrorMessage);
}

export async function submitOrderItemCustomizationsState (
  orderItemIds: string[],
  userToken: string
): Promise<OrderItemsRequestResult> {
  const payload = {
    order_items: orderItemIds.map(id => ({ id }))
  };

  const url = `${config.budsies.endpoint}/customizations/order-items/submit-requests?token=${userToken}`;

  const response = await postRequest(url, JSON.stringify(payload));
  const data = await response.json();

  const defaultErrorMessage = `Failed to submit order item customizations state`;

  if (response.status !== 200) {
    const errorMessage = data?.result?.error_message || defaultErrorMessage;

    throw new Error(errorMessage);
  }

  return gerOrderItemsRequestResult(data, defaultErrorMessage);
}
