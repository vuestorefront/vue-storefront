import { TaskQueue } from '@vue-storefront/core/lib/sync';
import { processURLAddress } from '@vue-storefront/core/helpers';
import config from 'config';

export async function getCheckoutObject (): Promise<any> {
  let url = processURLAddress(`${config.budsies.endpoint}/affirm/get-checkout-object?token={{token}}&cartId={{cartId}}`);

  const task = await TaskQueue.execute({
    url,
    payload: {
      headers: { 'Accept': 'application/json' },
      mode: 'cors',
      method: 'GET'
    },
    silent: true
  });

  return JSON.parse(task.result);
}
