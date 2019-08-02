import { StorageManager } from '@vue-storefront/core/lib/storage-manager'
import { entityKeyName } from '@vue-storefront/core/lib/store/entities'

async function prefetchCachedAttributes (config, filterField, filterValues) {
  if (!config.attributes.disablePersistentAttributesCache) {
    const attrCollection = StorageManager.get('attributes')
    const cachedAttributes = []
    for (const fv of filterValues) {
      const storedItem = await attrCollection.getItem(entityKeyName(filterField, fv.toLowerCase()))
      if (storedItem) {
        cachedAttributes.push(storedItem)
      }
    }
    return cachedAttributes
  } else return null
}

export { prefetchCachedAttributes }