import config from 'config'
import fetch from 'isomorphic-fetch'

const state = {
  cmsPages: [],
  cmsBlock: []
}

const getters = {
  getBlock: (state) => (id) => {
    return state.cmsBlock.find(item => {
      return item.id.toString() === id
    })
  },
  getPage: (state) => (id) => {
    return state.cmsPages.find(item => {
      return item.id.toString() === id
    })
  }
}

// actions
const actions = {
  loadBlock (context, id) {
    let url = (config.cms.endpointBlock).replace('{{cmsBlockId}}', id)
    fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      mode: 'cors'
    })
      .then(response => response.json())
      .then(data => {
        if (data.code === 200) {
          context.commit('setCmsBlock', data.result)
        }
      })
  },
  loadPage ({state, commit}, id) {
    let url = (config.cms.endpointPage).replace('{{cmsPageId}}', id)
    fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      mode: 'cors'
    })
      .then(response => response.json())
      .then(data => {
        if (data.code === 200) {
          commit('setCmsPage', data.result)
        }
      })
  }
}

// mutations
const mutations = {
  setCmsBlock (state, data) {
    if (state.cmsBlock.indexOf(data) === -1) {
      state.cmsBlock.push(data)
    }
  },
  setCmsPage (state, data) {
    if (state.cmsPages.indexOf(data) === -1) {
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
