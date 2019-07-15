import { cacheStorage as cache } from '../../'
import { MutationTypesInterface } from '../abstract/mutation-types'

import Axios from 'axios'
import config from 'config'

import { currentStoreView } from '@vue-storefront/core/lib/multistore'
import { processURLAddress } from '@vue-storefront/core/helpers'
import { isServer } from '@vue-storefront/core/helpers'
import { Logger } from '@vue-storefront/core/lib/logger'

export { MutationTypesInterface }

export interface OptionsInterface {
  context: any,
  options: SingleOptionsInterface,
  documentType: string,
  mutationTypes: MutationTypesInterface,
  storageKey: string
}

export interface SingleOptionsInterface {
  key?: string|null,
  value: string
}

export const single = async <T>(options: OptionsInterface): Promise<T> => {
  let { key, value } = options.options
  let { context, documentType, mutationTypes, storageKey } = options
  if (!key || key === null) {
    key = 'identifier'
  }

  const cacheKey = storageKey + '/' + value

  const state = context.state
  const storeView = currentStoreView()

  if (!state.items || state.items.length === 0 || !state.items.find(itm => itm[key] === value)) {
    if (await cache.getItem(cacheKey).then(item => item !== null)) {
      return cache.getItem(cacheKey).then(result => {
        context.commit(mutationTypes.add, result)
        return result
      })
    }

    if (!isServer) {
      context.commit(mutationTypes.add, { identifier: value })
    }

    let params = {
      'type': documentType,
      'uid': encodeURIComponent(value),
      'lang': null
    }

    if (storeView) {
      params.lang = storeView.i18n.defaultLocale.toLowerCase()
    }

    return Axios.get(
      processURLAddress(config.icmaa_cms.endpoint),
      { responseType: 'json', params }
    ).then(resp => {
      let result = resp.data.result;
      if (Object.keys(result).length === 0) {
        throw new Error('No results found')
      }

      result[key] = value;
      context.commit(mutationTypes.upd, result)

      cache.setItem(cacheKey, result)
        .catch(error => Logger.error(error, 'icmaa-cms'))

      return result
    }).catch(error => {
      context.commit(mutationTypes.rmv, { identifier: value })
      Logger.error(`Error while fetching ${key} "${value}"`, `icmaa-cms/${documentType}`, error)()
    })
  } else {
    return new Promise((resolve, reject) => {
      let result = state.items.find(itm => itm[key] === value)
      if (result) {
        cache.setItem(cacheKey, result)
          .catch(error => Logger.error(error, 'icmaa-cms'))

        resolve(result)
      } else {
        reject(new Error('Error while fetching state for ' + key + ' = ' + value))
      }
    })
  }
}
