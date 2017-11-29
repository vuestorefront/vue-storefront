import * as types from '../mutation-types'
import config from '../../config.json'

// initial state
const state = {
  token: '',
  current: null
}

const getters = {
}

// actions
const actions = {

  /**
   * Login user and return user profile and current token
   */
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

  /**
   * Load current user profile
   */
  me (context, { refresh = true }) {
    return new Promise((resolve, reject) => {
      const cache = global.db.usersCollection
      let resolvedFromCache = false
      cache.getItem('current-user', (err, res) => {
        if (err) {
          console.error(err)
          return
        }

        if (res) {
          context.commit(types.USER_INFO_LOADED, res)

          resolve(res)
          resolvedFromCache = true
          console.log('Current user served from cache')
        }
      })

      if (refresh) {
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
            context.commit(types.USER_INFO_LOADED, resp.result) // this also stores the current user to localForage
          }
          if (!resolvedFromCache) {
            resolve(resp.code === 200 ? resp : null)
          }
          return resp
        })
      } else {
        if (!resolvedFromCache) {
          resolve(null)
        }
      }
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
