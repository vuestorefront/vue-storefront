import { Module } from 'vuex'
import { actions } from './actions'
import { UrlState } from '@vue-storefront/core/modules/url/types/UrlState'

export const ExtendedUrlStore: Module<UrlState, any> = {
  actions
}
