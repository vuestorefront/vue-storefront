import { VueStorefrontModule, VueStorefrontModuleConfig } from '@vue-storefront/core/lib/module'
import { afterRegistration } from './hooks/afterRegistration'
import * as types from './store/mutation-types'

const store = {
  namespaced: true,
  state: {
    methods: null
  },
  mutations: {
     [types.SET_BACKEND_PAYMENT_METHODS](state, paymentMethods) {
      state.methods = paymentMethods
    }
  }
}

const KEY = 'payment-backend-methods'

const moduleConfig: VueStorefrontModuleConfig = {
  key: KEY,
  store: { modules: [{ key: KEY, module: store }] },
  afterRegistration
}

export const PaymentBackendMethods = new VueStorefrontModule(moduleConfig)