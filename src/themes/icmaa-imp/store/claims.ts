import { StorageManager } from '@vue-storefront/core/lib/storage-manager'
import UniversalStorage from '@vue-storefront/core/lib/store/storage'
import { Logger } from '@vue-storefront/core/lib/logger'

const claimCollection = (localized = false): UniversalStorage => {
  const claimStorageKey = localized ? 'claims' : 'uniClaims'
  if (!StorageManager.exists(claimStorageKey)) {
    StorageManager.init(claimStorageKey, localized)
  }
  return StorageManager.get(claimStorageKey)
}

export const claimsStore = {
  namespaced: true,
  actions: {
    set (context, { claimCode, value, description, localized }) {
      claimCollection(localized).setItem(claimCode, {
        code: claimCode,
        created_at: new Date(),
        value: value,
        description: description
      }).catch((reason) => {
        Logger.error(reason)
      })
    },
    unset (context, { claimCode, localized }) {
      claimCollection(localized).removeItem(claimCode)
        .catch((reason) => {
          Logger.error(reason)
        })
    },
    check (context, { claimCode, localized }) {
      return claimCollection(localized).getItem(claimCode)
        .catch((reason) => {
          Logger.error(reason)
        })
    }
  }
}
