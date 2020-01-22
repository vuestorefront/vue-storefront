import { Module } from 'vuex'
import GoogleTagManagerState, { AttributeMapItem } from '../types/GoogleTagManagerState'

import { googleTagManager } from 'config'
import { formatValue } from 'icmaa-config/helpers/price'
import pick from 'lodash-es/pick'

export const icmaaGoogleTagManagerModule: Module<GoogleTagManagerState, any> = {
  namespaced: true,
  state: {
    key: null,
    enabled: false
  },
  mutations: {
    enable (state, payload: boolean) {
      state.enabled = payload
    }
  },
  actions: {
    enable ({ commit }, payload: boolean = true) {
      commit('enable', payload)
    }
  },
  getters: {
    enabled: (state): boolean => state.enabled,
    getGTMProductDTO: (state, getters, rootState, rootGetters) => (item, attributeMap?: string[] | AttributeMapItem[]) => {
      let product = {}

      if (!attributeMap) {
        attributeMap = googleTagManager.productAttributes
      }

      attributeMap.forEach(attribute => {
        const isObject = typeof attribute === 'object'
        const attributeField: string = isObject ? attribute.field : attribute
        const attributeName: string = isObject ? attribute.name || attributeField : attribute
        const attributeType: string|boolean = isObject ? attribute.type || false : false

        if (
          item.hasOwnProperty(attributeField) ||
          product.hasOwnProperty(attributeName)
        ) {
          const value = item[attributeField] || product[attributeName]
          if (value) {
            switch (attributeType) {
              case 'price':
                product[attributeName] = formatValue(value, 'en-US')
                break
              case 'attribute':
                product[attributeName] = rootGetters['attribute/getOptionLabel']({ attributeKey: attributeField, optionId: value })
                break
              case 'children':
                product[attributeName] = value.map(v => pick(v, ['name', 'id', 'price', 'sku']))
                break
              case 'category':
                product[attributeName] = value.map(v => pick(v, ['name', 'category_id']))
                break
              default:
                product[attributeName] = value
            }
          }
        }
      })

      return product
    }
  }
}
