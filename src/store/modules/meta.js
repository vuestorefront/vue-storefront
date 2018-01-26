import config from 'config'

const state = {
  title: config.meta.shopName,
  description: config.meta.description,
  suffix: config.meta.titleSuffix
}

const getters = {
  meta (state) {
    return {
      title: state.title,
      description: state.description
    }
  }
}

const actions = {
  set ({commit}, meta) {
    commit('title', typeof meta.title !== 'undefined' ? meta.title : state.title)
    commit('description', typeof meta.description !== 'undefined' ? meta.description : state.description)
  }
}

const mutations = {
  title (state, title) {
    state.title = title + state.suffix
  },
  description (state, description) {
    state.description = description
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
