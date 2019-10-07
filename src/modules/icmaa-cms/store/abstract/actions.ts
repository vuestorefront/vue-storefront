import { cacheStorage as cache } from '../../'
import { MutationTypesInterface } from '../abstract/mutation-types'

import Axios from 'axios'
import config from 'config'
import { getCurrentStoreCode } from '../../helpers'

import { processURLAddress } from '@vue-storefront/core/helpers'
import { isServer } from '@vue-storefront/core/helpers'
import { Logger } from '@vue-storefront/core/lib/logger'

export { MutationTypesInterface }

export interface OptionsInterface {
  context: any,
  options: string | ListOptionsInterface | SingleOptionsInterface,
  documentType: string,
  mutationTypes: MutationTypesInterface,
  storageKey: string
}

export interface SingleOptionsInterface {
  key?: string|null,
  value: string
}

export interface ListOptionsInterface {
  [key: string]: any
}

export const list = async <T>(options: OptionsInterface): Promise<T[]> => {
  let values = options.options as ListOptionsInterface | string
  let { context, documentType, mutationTypes, storageKey } = options
  const { state } = context

  let params = {
    'type': documentType,
    'q': values,
    'lang': getCurrentStoreCode()
  }

  if (typeof values === 'string') {
    let identifiers = values.split(',')
    const extistingIdentifiersInState = identifiers.filter(i => (state.items.find(s => s.identifier === i)))

    if (state.items.length !== 0) {
      const stateItems = state.items.filter(i => extistingIdentifiersInState.includes(i.identifier))
      stateItems.forEach(i => {
        cache.setItem(storageKey + '/' + i.identifier, i)
          .catch(error => Logger.error(error, 'icmaa-cms'))
      })

      if (identifiers.length === extistingIdentifiersInState.length) {
        return stateItems
      }
    }

    const searchForIdentifiersInCache = identifiers.filter(i => !extistingIdentifiersInState.includes(i))
    values = searchForIdentifiersInCache.filter(async i => {
      await cache.getItem(storageKey + '/' + i)
        .then(result => {
          if (!result) {
            return false
          }

          context.commit(mutationTypes.add, result)
          return true
        })
        .catch(() => false)
    }).join(',')
  }

  if (values.length === 0) {
    return
  }

  return Axios.get(
    processURLAddress(config.icmaa_cms.endpoint) + '/search',
    { responseType: 'json', params }
  ).then(resp => {
    let results = resp.data.result
    if (results.length === 0) {
      Logger.log(`No results found for :`, `icmaa-cms/${documentType}`, values)()
      return
    }

    results.forEach(result => {
      const cacheKey = storageKey + '/' + result.identifier
      context.commit(mutationTypes.add, result)
      cache.setItem(cacheKey, result)
        .catch(error => Logger.error(error, 'icmaa-cms'))
    });

    return results
  })
}

export const single = async <T>(options: OptionsInterface): Promise<T> => {
  let { key, value } = options.options as SingleOptionsInterface
  let { context, documentType, mutationTypes, storageKey } = options
  if (!key || key === null) {
    key = 'identifier'
  }

  const cacheKey = storageKey + '/' + value

  const state = context.state

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
      'uid': value,
      'lang': getCurrentStoreCode()
    }

    return Axios.get(
      processURLAddress(config.icmaa_cms.endpoint) + '/by-uid',
      { responseType: 'json', params }
    ).then(resp => {
      let result = resp.data.result;
      if (Object.keys(result).length === 0 || resp.data.code === 400) {
        Logger.log(`No results found for ${key} "${value}"`, `icmaa-cms/${documentType}`)()
        return
      }

      context.commit(mutationTypes.upd, result)

      cache.setItem(cacheKey, result)
        .catch(error => Logger.error(error, 'icmaa-cms'))

      return result
    }).catch(error => {
      context.commit(mutationTypes.rmv, { identifier: value })
      Logger.error(`Error while fetching ${key} "${value}"`, `icmaa-cms/${documentType}`, error.message)()
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
