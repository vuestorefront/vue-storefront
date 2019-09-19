import * as pageTypes from './page/mutation-types'
import * as blockTypes from './block/mutation-types'
import { cmsPagesStorageKey } from './page'
import { cmsBlockStorageKey } from './block'
import { StorageManager } from '@vue-storefront/core/lib/storage-manager'
import { Logger } from '@vue-storefront/core/lib/logger'

const cmsPersistPlugin = (mutation, state) => {
  const cmsStorage = StorageManager.get('cms')

  if (mutation.type.startsWith(pageTypes.SN_CMS_PAGE)) {
    cmsStorage.setItem(cmsPagesStorageKey, state.cmsPage.items).catch((reason) => {
      Logger.error(reason, 'cms') // it doesn't work on SSR
    })
  }

  if (mutation.type.startsWith(blockTypes.SN_CMS_BLOCK)) {
    cmsStorage.setItem(cmsBlockStorageKey, state.cmsBlock.items).catch((reason) => {
      Logger.error(reason, 'cms') // it doesn't work on SSR
    })
  }
}

export default cmsPersistPlugin
