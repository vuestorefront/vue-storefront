export default {
  namespaced: true,
  state: {
    methods: []
  },
  mutations: {
    addMethod (state, paymentMethod) {
      state.methods.push(paymentMethod)
    }
  },
  actions: {
    addMethod ({commit}, paymentMethod) {
      commit('addMethod', paymentMethod)
    }
  },
  getters: {
    paymentMethods (state) {
      return state.methods
    }
  }
}
