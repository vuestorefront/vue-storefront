import { ActionTree } from 'vuex'
import * as types from '@vue-storefront/core/modules/newsletter/store/mutation-types'
import { NewsletterState } from '@vue-storefront/core/modules/newsletter/types/NewsletterState'

export const actions: ActionTree<NewsletterState, any> = {
  async status ({ commit, rootGetters }, email): Promise<boolean> {
    const customer = rootGetters['user/getCustomer']
    const isSubscribed = rootGetters['user/isLoggedIn']
      ? customer.is_subscribed
      : false

    if (isSubscribed) {
      commit(types.SET_EMAIL, email)
      commit(types.NEWSLETTER_SUBSCRIBE)
    } else {
      commit(types.NEWSLETTER_UNSUBSCRIBE)
    }

    return isSubscribed
  }
}
