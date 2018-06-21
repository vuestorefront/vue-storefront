import config from 'config'
import fetch from 'isomorphic-fetch'

const state = {
  cmsPages: [],
  cmsBlock: []
}

const getters = {
  getBlock: (state) => (id) => {
    return state.cmsBlock.find(item => item.id === id)
  },
  getPage: (state) => (id) => {
    return state.cmsPages.find(item => item.id === id)
  }
}

// actions
const actions = {
  loadCms (context, {id, type}) {
    let url = (config.cms.endpoint)
      .replace('{{type}}', type)
      .replace(`{{cmsId}}`, id)

    fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      mode: 'cors'
    })
      .then(response => response.json())
      .then(data => {
        if (data.code === 200) {
          context.commit(`setCms${type}`, data.result)
        }
      })
  }
}

// mutations
const mutations = {
  setCmsBlock (state, data) {
    if (!state.cmsBlock.includes(data)) {
      state.cmsBlock.push(data)
    }
  },
  setCmsPage (state, data) {
    if (!state.cmsPages.includes(data)) {
      state.cmsPages.push(data)
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
