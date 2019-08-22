import config from 'config';
import { DataResolver } from './types/DataResolver';
import { TaskQueue } from '@vue-storefront/core/lib/sync';
import Task from '@vue-storefront/core/lib/sync/types/Task';
import { processURLAddress } from '@vue-storefront/core/helpers';

const queueCheck = (sku: string, actionName: string): Promise<any> =>
  TaskQueue.queue({
    url: processURLAddress(`${config.stock.endpoint}/check?sku=${encodeURIComponent(sku)}`),
    payload: {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      mode: 'cors'
    },
    is_result_cacheable: true,
    product_sku: sku,
    callback_event: `store:${actionName}`
  })

const check = (sku: string): Promise<Task> =>
  TaskQueue.execute({
    url: processURLAddress(`${config.stock.endpoint}/check?sku=${encodeURIComponent(sku)}`),
    payload: {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      mode: 'cors'
    },
    is_result_cacheable: true,
    product_sku: sku
  })

const list = (skuList: string[]): Promise<Task> =>
  TaskQueue.execute({
    url: processURLAddress(
      `${config.stock.endpoint}/list?skus=${encodeURIComponent(
        skuList.join(',')
      )}`
    ),
    payload: {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      mode: 'cors'
    },
    skus: skuList
  })

export const StockService: DataResolver.StockService = {
  check,
  list,
  queueCheck
}
