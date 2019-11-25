import config from 'config';
import { processURLAddress } from '@vue-storefront/core/helpers'
import { TaskQueue } from '@vue-storefront/core/lib/sync'
import { Order } from '../types/TrackingState'

const getTracking = (orderId: number): Promise<Order|boolean> =>
  TaskQueue.execute({
    url: processURLAddress(config.icmaa_tracking.endpoint) + `?orderId=${orderId}&token={{token}}`,
    payload: {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      mode: 'cors',
      is_result_cacheable: true
    }
  }).then(resp => resp.code === 200 ? resp.result.tracking : false)

export default {
  getTracking
}
