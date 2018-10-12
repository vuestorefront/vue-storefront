// Set to unique param name from elasticsearch if it's not 'id'.
const uniqueIdentifierParamName = 'id'

const actions = {
  fetchBlock ({ commit }, config) {
    // Make it use ES with proper params from config
    fetch(`https://jsonplaceholder.typicode.com/${config.type}/${config.id}`)
      .then(response => response.json())
      .then(content => {
        return new Promise((resolve) => {
          commit('addBlock', content)
          resolve()
        })
      })
  },
  // Checks if block is already in a store, if not - fetches it
  getBlock ({commit}, config) {
  }
}

const mutations = {
  addBlock (state, block) {
    state.content.push(block)
  },
  removeBlock (state, identifier) {
    state.content = state.content.filter(block =>
      block[uniqueIdentifierParamName] !== identifier
    )
  },
  // TODO: store in 1 obj with blocks
  addToVisibleContent (state, block) {
    state.visibleContent.push(block)
  },
  removeFromVisibleContent (state, identifier) {
    state.content = state.content.filter(block =>
      block[uniqueIdentifierParamName] !== identifier
    )
  }
}

const getters = {
  find: (state) => (value, param = 'id') => {
    return state.content.find(block =>
      block[param] === value
    )
  }
}

export default {
  namespaced: true,
  state: {
    visibleContent: [],
    content: []
  },
  mutations,
  actions,
  getters
}
