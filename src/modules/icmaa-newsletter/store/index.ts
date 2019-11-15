import { Module } from 'vuex'
import { actions } from './actions'
import { NewsletterState } from '@vue-storefront/core/modules/newsletter/types/NewsletterState'

export const ExtendedNewsletterStore: Module<NewsletterState, any> = {
  actions
}
