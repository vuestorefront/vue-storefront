import igFeed from '../../resource/ig_feed.json'

// Initial state

const state = {
  tiles: igFeed
}

// getters
const getters = {
  getSocialTiles: state => {
    return state.tiles
  }
}

// actions
const actions = {
}

// mutations
const mutations = {
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
