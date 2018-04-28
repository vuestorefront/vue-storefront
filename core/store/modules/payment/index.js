export default {
  namespaced: true,
  state: {
    methods: []
  },
  mutations: {
    addMethod (state, paymentMethod) {
      state.methods.push(paymentMethod)
    },
    replaceMethods (state, paymentMethods) {
      state.methods = paymentMethods
    }
  },
  actions: {
    addMethod ({commit}, paymentMethod) {
      commit('addMethod', paymentMethod)
    },
    replaceMethods ({commit}, paymentMethods) {
      commit('replaceMethods', paymentMethods)
    }
  },
  getters: {
    paymentMethods (state) {
      return state.methods
    }
  }
}
