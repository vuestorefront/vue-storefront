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

export default {
  state,
  getters,
  actions,
  mutations
}
