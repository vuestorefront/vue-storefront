import Vue from 'vue'
import Vuex from 'vuex'
import RootState from '@vue-storefront/core/types/RootState'
import { once } from '@vue-storefront/core/helpers'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'

once('__VUE_EXTEND_VUEX__', () => {
  Vue.use(Vuex)
})

const state: any = {
  version: '',
  __DEMO_MODE__: false,
  config: {},
  storeView: {},
  twoStageCachingDelta1: 0,
  twoStageCachingDelta2: 0,
  twoStageCachingDisabled: false,
  userTokenInvalidated: null,
  userTokenInvalidateAttemptsCount: 0,
  userTokenInvalidateLock: 0
}

let rootStore = new Vuex.Store<RootState>({
  // TODO: refactor it to return just the constructor to avoid event-bus and i18n shenanigans; challenge: the singleton management OR add i18n and eventBus here to rootStore instance?  modules: {
  state,
  actions,
  getters,
  mutations
})

export default rootStore
