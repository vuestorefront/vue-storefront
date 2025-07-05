import config from 'config';

import { TaskQueue } from '@vue-storefront/core/lib/sync';
import Task from '@vue-storefront/core/lib/sync/types/Task';

import { DraftPlushie } from '../types/draft-plushie.interface';

export async function fetchOrderItemCustomizationsState (orderItemId: string): Promise<DraftPlushie> {
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

  return result.result as DraftPlushie;
}

export async function saveOrderItemCustomizationsState (payload: DraftPlushie): Promise<Task> {
  const url = `${config.budsies.endpoint}/customizations/order-items/states?token={{token}}`;

  return TaskQueue.execute({
    url,
    payload: {
      headers: { 'Accept': 'application/json' },
      mode: 'cors',
      method: 'POST',
      body: JSON.stringify(payload)
    }
  });
}

export async function submitOrderItemCustomizationsState (payload: { orderItemId: string }): Promise<Task> {
  const url = `${config.budsies.endpoint}/customizations/order-items/submit-requests`;

  return TaskQueue.execute({
    url,
    payload: {
      headers: { 'Accept': 'application/json' },
      mode: 'cors',
      method: 'POST',
      body: JSON.stringify(payload)
    }
  });
}
