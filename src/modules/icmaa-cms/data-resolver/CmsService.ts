import config from 'config'
import { processURLAddress } from '@vue-storefront/core/helpers'
import { TaskQueue } from '@vue-storefront/core/lib/sync'

import Task from '@vue-storefront/core/lib/sync/types/Task'

import { getCurrentStoreCode } from '../helpers'

const createQueryString: Function = (params: Record<string, any>): string =>
  Object.keys(params).map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(params[key])).join('&')

const single = <T>(options: { documentType: string, uid: string, storeCode?: string }): Promise<T | boolean | Task> => {
  const queryString = createQueryString({
    'type': options.documentType,
    'uid': options.uid,
    'lang': options.storeCode || getCurrentStoreCode()
  })

  return TaskQueue.execute({
    url: processURLAddress(config.icmaa_cms.endpoint) + `/by-uid?${queryString}`,
    payload: {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      mode: 'cors'
    },
    is_result_cacheable: true,
    silent: true
  }).then(resp => resp.resultCode === 200 ? resp.result : false)
}

const singleQueue = (options: { documentType: string, uid: string, storeCode?: string, actionName?: string }): Promise<Task|any> => {
  const queryString = createQueryString({
    'type': options.documentType,
    'uid': options.uid,
    'lang': options.storeCode || getCurrentStoreCode()
  })

  return TaskQueue.queue({
    url: processURLAddress(config.icmaa_cms.endpoint) + `/by-uid?${queryString}`,
    payload: {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      mode: 'cors'
    },
    is_result_cacheable: true,
    silent: true,
    callback_event: options.actionName ? `store:${options.actionName}` : undefined
  })
}

export default {
  single,
  singleQueue
}
