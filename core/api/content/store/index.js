const actions = {
  fetchContent ({ commit }, id, param = 'id') {
    fetch('https://jsonplaceholder.typicode.com/todos/' + id)
      .then(response => response.json())
      .then(content => {
        return new Promise((resolve, reject) => {
          if (content) {
            commit('addBlock', content)
          } else {
            reject(new Error('error while fetching CMS data'))
          }
        })
      })
  }
}

const mutations = {
  addBlock (state, entity) {
    state.content.push(entity)
  },
  removeBlock (state, id, param = 'id') {
    state.content = state.content.filter(block =>
      block[param] !== id)
  }
}

const getters = {
  findBlock: (state) => (value, param = 'id') => {
    return state.content.find(block =>
      block[param] === value
    )
  }
}

export default {
  namespaced: true,
  state: {
    content: []
  },
  mutations,
  actions,
  getters
}
