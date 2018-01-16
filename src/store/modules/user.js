import * as types from '../mutation-types'
import config from 'config'
import EventBus from 'src/event-bus'
import { ValidationError } from 'lib/exceptions'
import store from '../'

const Ajv = require('ajv') // json validator

EventBus.$on('user-after-update', (event) => {
  if (event.resultCode === 200) {
    EventBus.$emit('notification', {
      type: 'success',
      message: 'Accound data has successfully been updated',
      action1: { label: 'OK', action: 'close' }
    })
    store.dispatch('user/refreshCurrentUser', event.result)
  }
})

EventBus.$on('session-after-started', (event) => { // example stock check callback
  console.log('Loading user profile')
  store.dispatch('user/me', { refresh: navigator.onLine }, { root: true }).then((us) => {
  })
})

// initial state
const state = {
  token: '',
  current: null,
  session_started: new Date()
}

const getters = {
  isLoggedIn (state) {
    return state.current !== null
  }
}

// actions
const actions = {

  startSession (context) {
    context.commit(types.USER_START_SESSION)

    const cache = global.db.usersCollection
    cache.getItem('current-token', (err, res) => {
      if (err) {
        console.error(err)
        return
      }

      if (res) {
        context.commit(types.USER_TOKEN_CHANGED, res)
      }
      EventBus.$emit('session-after-started')
    })
  },

  /**
   * Send password reset link for specific e-mail
   */
  resetPassword (context, { email }) {
    console.log({ email: email })
    return fetch(config.users.endpoint + '/resetPassword', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: email })
    }).then((response) => {
      const contentType = response.headers.get('content-type')
      if (contentType && contentType.includes('application/json')) {
        return response.json()
      } else {
        console.error('Error with response - bad content-type!')
      }

      return response
    })
  },

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
        context.dispatch('me', { refresh: true, useCache: false }).then(result => {
        })
      }
      return resp
    })
  },

  /**
   * Login user and return user profile and current token
   */
  register (context, { email, firstname, lastname, password }) {
    return fetch(config.users.endpoint + '/create', { method: 'POST',
      mode: 'cors',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ customer: { email: email, firstname: firstname, lastname: lastname }, password: password })
    }).then(resp => { return resp.json() })
    .then((resp) => {
      if (resp.code === 200) {
        context.dispatch('login', { username: email, password: password }).then(result => { // login user
        })
      }
      return resp
    })
  },
  /**
   * Load current user profile
   */
  me (context, { refresh = true, useCache = true }) {
    return new Promise((resolve, reject) => {
      if (!context.state.token) {
        console.log('No User token, user unathorized')
        return resolve(null)
      }
      const cache = global.db.usersCollection
      let resolvedFromCache = false

      if (useCache === true) { // after login for example we shouldn't use cache to be sure we're loading currently logged in user
        cache.getItem('current-user', (err, res) => {
          if (err) {
            console.error(err)
            return
          }

          if (res) {
            context.commit(types.USER_INFO_LOADED, res)
            EventBus.$emit('user-after-loggedin', res)

            resolve(res)
            resolvedFromCache = true
            console.log('Current user served from cache')
          }
        })
      }

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

            EventBus.$emit('user-after-loggedin', resp.result)
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
  },
  /**
   * Update user profile with data from My Account page
   */
  update (context, userData) {
    const ajv = new Ajv()
    const validate = ajv.compile(require('../../models/userProfile.schema.json'))

    if (!validate(userData)) { // schema validation of user profile data
      throw new ValidationError(validate.errors)
    } else {
      return new Promise((resolve, reject) => {
        context.dispatch('sync/queue', { url: config.users.endpoint + '/me?token={{token}}',
          payload: {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            mode: 'cors',
            body: JSON.stringify(userData)
          },
          callback_event: 'user-after-update'
        }, { root: true }).then(task => {
          resolve()
        })
      })
    }
  },

  refreshCurrentUser (context, userData) {
    context.commit(types.USER_INFO_LOADED, userData)
  },

  /**
   * Change user password
   */
  changePassword (context, passwordData) {
    return fetch(config.users.endpoint + '/changePassword?token=' + context.state.token,
      {
        method: 'POST',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(passwordData)
      }
    ).then(resp => { return resp.json() })
    .then((resp) => {
      if (resp.code === 200) {
        EventBus.$emit('notification', {
          type: 'success',
          message: 'Password has successfully been changed',
          action1: { label: 'OK', action: 'close' }
        })

        store.dispatch('user/login', {
          username: context.state.current.email,
          password: passwordData.newPassword
        })
      } else {
        EventBus.$emit('notification', {
          type: 'error',
          message: resp.result,
          action1: { label: 'OK', action: 'close' }
        })
      }
    })
  },

  /**
   * Logout user
   */
  logout (context) {
    context.commit(types.USER_END_SESSION)
    EventBus.$emit('notification', {
      type: 'success',
      message: 'You\'re logged out',
      action1: { label: 'OK', action: 'close' }
    })
  }
}

// mutations
const mutations = {
  [types.USER_TOKEN_CHANGED] (state, newToken) {
    state.token = newToken
  },
  [types.USER_START_SESSION] (state) {
    state.session_started = new Date()
  },
  [types.USER_INFO_LOADED] (state, currentUser) {
    state.current = currentUser
  },
  [types.USER_END_SESSION] (state) {
    state.token = ''
    state.current = null
    state.session_started = null
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
