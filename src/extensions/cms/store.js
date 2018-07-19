import config from 'config'
import fetch from 'isomorphic-fetch'

const state = {
  cmsPages: [],
  cmsBlocks: []
}

const getters = {
  getBlock: (state) => (id) => {
    return state.cmsBlocks.find(item => item.id === id)
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
      .replace('{{cmsId}}', id)

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
      .catch(function () {
        console.error('You need to install a custom Magento module from Snow.dog to make the CMS magick happen. Please go to https://github.com/SnowdogApps/magento2-cms-api and follow the instructions')
      })
  }
}

// mutations
const mutations = {
  setCmsBlock (state, data) {
    if (!state.cmsBlocks.filter(e => e.id === data.id).length > 0) {
      state.cmsBlocks.push(data)
    }
  },
  setCmsPage (state, data) {
    if (!state.cmsPages.filter(e => e.id === data.id).length > 0) {
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
