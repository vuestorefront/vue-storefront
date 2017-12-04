const state = {
  newsletter: false
}

const mutations = {
  setNewsletter (state, action) {
    state.newsletter = action === true
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
