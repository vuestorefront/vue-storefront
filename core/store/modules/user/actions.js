import EventBus from '../../lib/event-bus'
import * as types from '../../mutation-types'
import config from '../../lib/config'
import store from '../../'
import { ValidationError } from '../../lib/exceptions'
import i18n from '../../lib/i18n'
const Ajv = require('ajv') // json validator

export default {
  startSession (context) {
    context.commit(types.USER_START_SESSION)
    const cache = global.$VS.db.usersCollection
    cache.getItem('current-token', (err, res) => {
      if (err) {
        console.error(err)
        return
      }

      if (res) {
        context.commit(types.USER_TOKEN_CHANGED, { newToken: res })
      }
      EventBus.$emit('session-after-started')
    })

    const newsletterStorage = global.$VS.db.newsletterPreferencesCollection
    newsletterStorage.getItem('newsletter-preferences', (err, res) => {
      if (err) {
        console.error(err)
        return
      }

      if (res) {
        context.commit(types.USER_UPDATE_PREFERENCES, res)
      }
    })
  },
  /**
   * Send password reset link for specific e-mail
   */
  resetPassword (context, { email }) {
    console.log({ email: email })
    return context.dispatch('sync/execute', { url: config.users.resetPassword_endpoint,
      payload: {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email })
      }
    }, { root: true }).then((response) => {
      return response
    })
  },
  /**
   * Login user and return user profile and current token
   */
  login (context, { username, password }) {
    return fetch(config.users.login_endpoint, { method: 'POST',
      mode: 'cors',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username: username, password: password })
    }).then(resp => { return resp.json() })
      .then((resp) => {
        if (resp.code === 200) {
          context.commit(types.USER_TOKEN_CHANGED, { newToken: resp.result, meta: resp.meta }) // TODO: handle the "Refresh-token" header
          context.dispatch('me', { refresh: true, useCache: false }).then(result => {})
          context.dispatch('getOrdersHistory', { refresh: true, useCache: false }).then(result => {})
        }
        return resp
      })
  },
  /**
   * Login user and return user profile and current token
   */
  register (context, { email, firstname, lastname, password }) {
    return fetch(config.users.create_endpoint, { method: 'POST',
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
  * Invalidate user token
  */
  refresh (context) {
    return new Promise((resolve, reject) => {
      const usersCollection = global.$VS.db.usersCollection
      usersCollection.getItem('current-refresh-token', (err, refreshToken) => {
        if (err) {
          console.error(err)
        }
        return fetch(config.users.refresh_endpoint, { method: 'POST',
          mode: 'cors',
          headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ refreshToken: refreshToken })
        }).then(resp => { return resp.json() })
          .then((resp) => {
            if (resp.code === 200) {
              context.commit(types.USER_TOKEN_CHANGED, { newToken: resp.result, meta: resp.meta ? resp.meta : null }) // TODO: handle the "Refresh-token" header
            }
            resolve(resp)
          }).catch((exc) => reject(exc))
      })
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
      const cache = global.$VS.db.usersCollection
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
        return context.dispatch('sync/execute', { url: config.users.me_endpoint,
          payload: { method: 'GET',
            mode: 'cors',
            headers: {
              'Accept': 'application/json, text/plain, */*',
              'Content-Type': 'application/json'
            }
          }
        }, { root: true })
          .then((resp) => {
            if (resp.resultCode === 200) {
              context.commit(types.USER_INFO_LOADED, resp.result) // this also stores the current user to localForage
            }
            if (!resolvedFromCache) {
              EventBus.$emit('user-after-loggedin', resp.result)
              resolve(resp.resultCode === 200 ? resp : null)
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
    const validate = ajv.compile(require('./userProfile.schema.json'))

    if (!validate(userData)) { // schema validation of user profile data
      EventBus.$emit('notification', {
        type: 'error',
        message: i18n.t('Internal validation error. Please check if all required fields are filled in. Please contact us on contributors@vuestorefront.io'),
        action1: { label: i18n.t('OK'), action: 'close' }
      })
      throw new ValidationError(validate.errors)
    } else {
      return new Promise((resolve, reject) => {
        context.dispatch('sync/queue', { url: config.users.me_endpoint,
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
    console.log(context)
    return context.dispatch('sync/execute', { url: config.users.changePassword_endpoint,
      payload: {
        method: 'POST',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(passwordData)
      }
    }).then((resp) => {
      if (resp.code === 200) {
        EventBus.$emit('notification', {
          type: 'success',
          message: 'Password has successfully been changed',
          action1: { label: i18n.t('OK'), action: 'close' }
        })

        store.dispatch('user/login', {
          username: context.state.current.email,
          password: passwordData.newPassword
        })
      } else {
        EventBus.$emit('notification', {
          type: 'error',
          message: i18n.t(resp.result),
          action1: { label: i18n.t('OK'), action: 'close' }
        })
      }
    })
  },
  /**
   * Logout user
   */
  logout (context, { silent = false }) {
    context.commit(types.USER_END_SESSION)
    context.dispatch('cart/serverTokenClear', {}, { root: true })
    if (!silent) {
      EventBus.$emit('notification', {
        type: 'success',
        message: i18n.t('You\'re logged out'),
        action1: { label: i18n.t('OK'), action: 'close' }
      })
    }
  },
  /**
   * Save user's newsletter preferences
   */
  updatePreferences (context, newsletterPreferences) {
    context.commit(types.USER_UPDATE_PREFERENCES, newsletterPreferences)
    EventBus.$emit('notification', {
      type: 'success',
      message: i18n.t('Newsletter preferences have successfully been updated'),
      action1: { label: i18n.t('OK'), action: 'close' }
    })
  },
  /**
   * Load user's orders history
   */
  getOrdersHistory (context, { refresh = true, useCache = true }) {
    return new Promise((resolve, reject) => {
      if (!context.state.token) {
        console.log('No User token, user unathorized')
        return resolve(null)
      }
      const cache = global.$VS.db.ordersHistoryCollection
      let resolvedFromCache = false

      if (useCache === true) { // after login for example we shouldn't use cache to be sure we're loading currently logged in user
        cache.getItem('orders-history', (err, res) => {
          if (err) {
            console.error(err)
            return
          }

          if (res) {
            context.commit(types.USER_ORDERS_HISTORY_LOADED, res)
            EventBus.$emit('user-after-loaded-orders', res)

            resolve(res)
            resolvedFromCache = true
            console.log('Current user order history served from cache')
          }
        })
      }

      if (refresh) {
        return context.dispatch('sync/execute', { url: config.users.history_endpoint,
          payload: { method: 'GET',
            mode: 'cors',
            headers: {
              'Accept': 'application/json, text/plain, */*',
              'Content-Type': 'application/json'
            }
          }
        }, { root: true }).then((resp) => {
          if (resp.code === 200) {
            context.commit(types.USER_ORDERS_HISTORY_LOADED, resp.result) // this also stores the current user to localForage

            EventBus.$emit('user-after-loaded-orders', resp.result)
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
