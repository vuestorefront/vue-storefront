import { StorageManager } from '@vue-storefront/core/lib/storage-manager'
import { entityKeyName } from '@vue-storefront/core/lib/store/entities'
import config from 'config'

async function prefetchCachedAttributes (filterField, filterValues) {
  if (!config.attributes || !config.attributes.disablePersistentAttributesCache) {
    const attrCollection = StorageManager.get('attributes')
    const cachedAttributes = filterValues.map(
      async filterValue => attrCollection.getItem(entityKeyName(filterField, String(filterValue).toLowerCase()))
    )
    return Promise.all(cachedAttributes)
  }
}

export { prefetchCachedAttributes }
