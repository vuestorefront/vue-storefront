const state = {
  methods: []
}

const getters = {
}

// actions
const actions = {
}

// mutations
const mutations = {
  setBackendPaymentMethods (state, paymentMethods) {
    state.methods = paymentMethods
  }
}

module.exports = {
  state,
  getters,
  actions,
  mutations
}
