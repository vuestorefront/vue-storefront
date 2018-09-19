const state = {
  tiles: []
}

const actions = {
  updateSocialTiles ({commit}, data) {
    commit('updateSocialTiles', data)
  }
}

const mutations = {
  updateSocialTiles (state, data) {
    state.tiles = data
  }
}

const getters = {
  getSocialTiles: state => {
    return state.tiles
  }
}

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}
