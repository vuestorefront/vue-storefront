import { getMutationData } from '@vue-storefront/store'
import * as blockTypes from './block/mutation-types'
import { cmsBlockStorageKey } from './block'
import { cacheStorage  } from '../'

export function plugin (mutation, state) {
  let { storeName, actionName } = getMutationData(mutation.type)

  if (storeName === blockTypes.CMS_PRISMIC) { // check if this mutation is block related
    cacheStorage.setItem(cmsBlockStorageKey, state.cmsBlock.items).catch((reason) => {
      console.error(reason) // it doesn't work on SSR
    })
  }
}
