import Vue from 'vue'
import { ActionTree } from 'vuex'
import RootState from '@vue-storefront/store/types/RootState'
import ClaimsState from '../types/ClaimsState'

const actions: ActionTree<ClaimsState, RootState> = {
  set (context, { claimCode, value, description }) {
    const claimCollection = Vue.prototype.$db.claimsCollection
    claimCollection.setItem(claimCode, {
      code: claimCode,
      created_at: new Date(),
      value: value,
      description: description
    }).catch((reason) => {
      console.error(reason) // it doesn't work on SSR
    })
  },

  unset (context, { claimCode }) {
    const claimCollection = Vue.prototype.$db.claimsCollection
    claimCollection.removeItem(claimCode).catch((reason) => {
      console.error(reason) // it doesn't work on SSR
    })
  },

  check (context, { claimCode }) {
    const claimCollection = Vue.prototype.$db.claimsCollection
    return claimCollection.getItem(claimCode).catch((reason) => {
      console.error(reason) // it doesn't work on SSR
    })
  }
}

export default actions
