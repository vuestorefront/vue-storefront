import fetch from 'isomorphic-fetch'
import { Logger } from '@vue-storefront/core/lib/logger'

const state = {
  cmsPages: [],
  cmsBlocks: []
}

const getters = {
  getBlock: (state) => (id) => {
    return state.cmsBlocks.find(item => item.id === id)
  },
  getBlockIdentifier: (state) => (identifier) => {
    return state.cmsBlocks.find(item => item.identifier === identifier)
  },
  getPage: (state) => (id) => {
    return state.cmsPages.find(item => item.id === id)
  },
  getPageIdentifier: (state) => (identifier) => {
    return state.cmsPages.find(item => item.identifier === identifier)
  }
}

// actions
const actions = {
  loadCms (context, {url, type}) {
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
      .catch((err) => {
        Logger.log(err)()
        Logger.error('You need to install a custom Magento module from Snow.dog to make the CMS magic happen. Please go to https://github.com/SnowdogApps/magento2-cms-api and follow the instructions')()
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

export const store = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
