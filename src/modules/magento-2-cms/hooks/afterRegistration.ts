import { StorageManager } from '@vue-storefront/core/store/lib/storage-manager'

export function afterRegistration ({ Vue, config, store, isServer }) {
  store.subscribe((mutation, state) => {
    const type = mutation.type

    if (
      type.endsWith('setCmsBlock') ||
      type.endsWith('setCmsPage')
    ) {
      StorageManager.get('cmsData').setItem('cms-data', state.cms).catch((reason) => {
        console.error(reason)
      })
    }
  })
}
