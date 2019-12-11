import { Module } from 'vuex'
import getters from './getters'
import AttributeState from '@vue-storefront/core/modules/catalog/types/AttributeState'

export const IcmaaExtendedAttributeStore: Module<AttributeState, any> = {
  getters
}
