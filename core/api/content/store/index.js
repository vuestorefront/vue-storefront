const dataMock = [
  {id: '0', content: 'data zero'},
  {id: '1', content: 'data one'}
]

const actions = {
  fetchContent ({ commit }, id, param = 'id') {
    return new Promise((resolve, reject) => {
      commit('addEntity', dataMock[id])
      resolve(dataMock[id])
      reject(new Error('epic fail'))
    })
  }
}

const mutations = {
  addBlock (state, entity) {
    state.content.push(entity)
  }
}

const getters = {
  findBlock: (state) => (value, param = 'id') => {
    return state.content.map(current =>
      current[param] === value
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
