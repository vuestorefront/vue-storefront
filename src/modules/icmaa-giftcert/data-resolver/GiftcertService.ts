import config from 'config'
import { processURLAddress } from '@vue-storefront/core/helpers'
import { TaskQueue } from '@vue-storefront/core/lib/sync'
import { GiftcertResult } from '../types/GiftcertState'

const loadGiftcert = (number: string): Promise<GiftcertResult> =>
  TaskQueue.execute({
    url: processURLAddress(config.icmaa_giftcert.endpoint) + '/index?token={{token}}',
    payload: {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      mode: 'cors',
      body: JSON.stringify({ number: number })
    }
  }).then(resp => resp.result);

export default {
  loadGiftcert
};
