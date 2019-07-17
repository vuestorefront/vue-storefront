import { StorageManager } from '@vue-storefront/core/store/lib/storage-manager'

export function beforeRegistration ({ Vue, config, store, isServer }) {
  StorageManager.init('user')
}
