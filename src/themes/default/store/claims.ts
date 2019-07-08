import Vue from 'vue'
import { Logger } from '@vue-storefront/core/lib/logger'

export const store = {
  namespaced: true,
  actions: {
    set (context, { claimCode, value, description }) {
      const claimCollection = Vue.prototype.$db.claimsCollection
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
      const claimCollection = Vue.prototype.$db.claimsCollection
      claimCollection.removeItem(claimCode).catch((reason) => {
        Logger.error(reason) // it doesn't work on SSR
      })
    },

    check (context, { claimCode }) {
      const claimCollection = Vue.prototype.$db.claimsCollection
      return claimCollection.getItem(claimCode).catch((reason) => {
        Logger.error(reason) // it doesn't work on SSR
      })
    }
  }
}
