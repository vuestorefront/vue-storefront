import { ActionTree } from 'vuex'
import RootState from '@vue-storefront/core/types/RootState'
import ClaimsState from '../types/ClaimsState'
import { Logger } from '@vue-storefront/core/lib/logger'
import { StorageManager } from '@vue-storefront/core/store/lib/storage-manager'

const actions: ActionTree<ClaimsState, RootState> = {
  set (context, { claimCode, value, description }) {
    const claimCollection = StorageManager.get('claimsCollection')
    claimCollection.setItem(claimCode, {
      code: claimCode,
      created_at: new Date(),
      value: value,
      description: description
    }).catch((reason) => {
      Logger.error(reason) // it doesn't work on SSR
    })
  },

  unset (context, { claimCode }) {
    const claimCollection = StorageManager.get('claimsCollection')
    claimCollection.removeItem(claimCode).catch((reason) => {
      Logger.error(reason) // it doesn't work on SSR
    })
  },

  check (context, { claimCode }) {
    const claimCollection = StorageManager.get('claimsCollection')
    return claimCollection.getItem(claimCode).catch((reason) => {
      Logger.error(reason) // it doesn't work on SSR
    })
  }
}

export default actions
