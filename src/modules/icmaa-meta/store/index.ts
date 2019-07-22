import { Module } from 'vuex'
import { Logger } from '@vue-storefront/core/lib/logger';

import { storeCode } from '../helper'

export default interface IcmaaMetaStoreState {
  data?: {
    title?: string,
    titleTemplate?: string,
    [propName: string]: any
  }
}

export const IcmaaMetaStore: Module<IcmaaMetaStoreState, any> = {
  namespaced: true,
  state: { },
  getters: {
    getData: state => {
      return state.data
    }
  },
  actions: {
    async load ({commit, rootState}, data) {
      let metaData: any
      try {
        metaData = await import(/* webpackChunkName: "vsf-meta-[request]" */ `theme/resource/meta/head-${storeCode()}`)
      } catch (err) {
        try {
          Logger.debug(`Unable to load meta infos for "${storeCode()}" so the default will be loaded.`, `icmaa-meta`, err)()
          metaData = await import(/* webpackChunkName: "vsf-meta-default-[request]" */ `theme/resource/meta/head`)
        } catch (err) {
          Logger.error(`Unable to load meta infos:`, `icmaa-meta`, err)()
          throw new Error('Unable to load meta infos')
        }
      }

      commit('ICMAA_META_SET_DATA', metaData.default)
    }
  },
  mutations: {
    ICMAA_META_SET_DATA (state, data) {
      state.data = data
    }
  }
}
