import { createModule } from '@vue-storefront/core/lib/module'
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
export const PaymentBackendMethods = createModule({
  key: KEY,
  store: { modules: [{ key: KEY, module: store }] },
  afterRegistration
})