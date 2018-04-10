export default {
  namespaced: true,
  state: {
    methods: []
  },
  mutations: {
    addMethod (state, shippingMethods) {
      state.methods.push(shippingMethods)
    },
    replaceMethods (state, shippingMethods) {
      state.methods = shippingMethods
    }
  },
  actions: {
    addMethod ({commit}, shippingMethod) {
      commit('addMethod', shippingMethod)
    },
    replaceMethods ({commit}, shippingMethods) {
      commit('replaceMethods', shippingMethods)
    }
  },
  getters: {
    shippingMethods (state) {
      return state.methods
    }
  }
}
