import config from 'config'

import { getCurrentStoreCode } from '../helpers'
import IcmaaTaskQueue from '../data-resolver/Task'

import { processURLAddress } from '@vue-storefront/core/helpers'
import Task from '@vue-storefront/core/lib/sync/types/Task'

const single = <T>(options: { documentType: string, uid: string, storeCode?: string }): Promise<T | boolean> => {
  const queryString = IcmaaTaskQueue.createQueryString({
    'type': options.documentType,
    'uid': options.uid,
    'lang': options.storeCode || getCurrentStoreCode()
  })

  return IcmaaTaskQueue.execute({
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
  const queryString = IcmaaTaskQueue.createQueryString({
    'type': options.documentType,
    'uid': options.uid,
    'lang': options.storeCode || getCurrentStoreCode()
  })

  return IcmaaTaskQueue.queue({
    url: processURLAddress(config.icmaa_cms.endpoint) + `/by-uid?${queryString}`,
    payload: {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      mode: 'cors'
    },
    is_result_cacheable: true,
    silent: true,
    callback_event: options.actionName ? options.actionName : undefined
  })
}

export default {
  single,
  singleQueue
}
