import * as pageTypes from './page/mutation-types'
import * as blockTypes from './block/mutation-types'
import { cmsPagesStorageKey } from './page'
import { cmsBlockStorageKey } from './block'
import { cacheStorage  } from '../'

export function plugin (mutation, state) {
  const type = mutation.type

  if (type.startsWith(pageTypes.SN_CMS_PAGE)) { // check if this mutation is pages related
    cacheStorage.setItem(cmsPagesStorageKey, state.cmsPage.items).catch((reason) => {
      console.error(reason) // it doesn't work on SSR
    })
  }

  if (type.startsWith(blockTypes.SN_CMS_BLOCK)) { // check if this mutation is block related
    cacheStorage.setItem(cmsBlockStorageKey, state.cmsBlock.items).catch((reason) => {
      console.error(reason) // it doesn't work on SSR
    })
  }
}