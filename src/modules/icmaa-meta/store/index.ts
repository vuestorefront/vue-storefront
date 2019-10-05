import { Module } from 'vuex'
import { StoreView } from 'icmaa-config/types/ConfigState'
import { Logger } from '@vue-storefront/core/lib/logger'

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
    async load ({ commit, rootGetters }) {
      await import(/* webpackChunkName: "vsf-meta-default" */ `theme/resource/meta/head`)
        .then(metaDefault => {
          const storeConfig: StoreView = rootGetters['icmaaConfig/getCurrentStoreConfig']
          const meta = metaDefault.default(storeConfig)
          commit('ICMAA_META_SET_DATA', meta)
        })
        .catch(err => {
          Logger.error(`Unable to load meta infos:`, `icmaa-meta`, err)()
        })
    }
  },
  mutations: {
    ICMAA_META_SET_DATA (state, data) {
      state.data = data
    }
  }
}
