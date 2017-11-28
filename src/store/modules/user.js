import * as types from '../mutation-types'
import config from '../../config.json'

// initial state
const state = {
  token: ''
}

const getters = {
}

// actions
const actions = {
  login (context, { username, password }) {
    return fetch(config.users.endpoint + '/login', { method: 'POST',
      mode: 'cors',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username: username, password: password })
    }).then(resp => { return resp.json() })
    .then((resp) => {
      if (resp.code === 200) {
        context.commit(types.USER_TOKEN_CHANGED, resp.result)

        context.dispatch('me').then(result => {
          context.commit(types.USER_TOKEN_CHANGED, resp.result)
          console.log(result)
        })
      }
      return resp
    })
  },

  me (context) {
    console.log(config.users.endpoint + '/me?token=' + context.state.token)
    return fetch(config.users.endpoint + '/me?token=' + context.state.token, { method: 'GET',
      mode: 'cors',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    }).then(resp => { return resp.json() })
    .then((resp) => {
      if (resp.code === 200) {
        context.commit(types.USER_INFO_LOADED, resp.result)
      }
      return resp
    })
  }
}

// mutations
const mutations = {
  [types.USER_TOKEN_CHANGED] (state, newToken) {
    state.token = newToken
  },
  [types.USER_INFO_LOADED] (state, currentUser) {
    state.current = currentUser
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
