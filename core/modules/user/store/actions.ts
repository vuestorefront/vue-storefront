import Vue from 'vue'
import { ActionTree } from 'vuex'
import * as types from './mutation-types'
import rootStore from '@vue-storefront/core/store'
import i18n from '@vue-storefront/i18n'
import { adjustMultistoreApiUrl } from '@vue-storefront/core/lib/multistore'
import RootState from '@vue-storefront/core/types/RootState'
import UserState from '../types/UserState'
import { Logger } from '@vue-storefront/core/lib/logger'
import { TaskQueue } from '@vue-storefront/core/lib/sync'
import { UserProfile } from '../types/UserProfile'
import { isServer } from '@vue-storefront/core/helpers'
// import router from '@vue-storefront/core/router'

const actions: ActionTree<UserState, RootState> = {
  async startSession (context) {
    if (isServer || context.getters.isLocalDataLoaded) return
    context.commit(types.USER_LOCAL_DATA_LOADED, true)

    const user = localStorage.getItem(`shop/user/current-user`);
    if (user) {
      context.commit(types.USER_INFO_LOADED, JSON.parse(user))  
    }

    context.commit(types.USER_START_SESSION)
    const cache = Vue.prototype.$db.usersCollection
    cache.getItem('current-token', (err, res) => {
      if (err) {
        Logger.error(err, 'user')()
        return
      }

      if (res) {
        context.commit(types.USER_TOKEN_CHANGED, { newToken: res })
        context.dispatch('sessionAfterAuthorized')

        if (rootStore.state.config.usePriceTiers) {
          Vue.prototype.$db.usersCollection.getItem('current-user', (err, userData) => {
            if (err) {
              Logger.error(err, 'user')()
              return
            }

            if (userData) {
              context.dispatch('setUserGroup', userData)
            }
          })
        }
      } else {
        Vue.prototype.$bus.$emit('session-after-nonauthorized')
      }
      Vue.prototype.$bus.$emit('session-after-started')
    })
  },
  /**
   * Send password reset link for specific e-mail
   */
  resetPassword (context, { email }) {
    return TaskQueue.execute({ url: rootStore.state.config.users.resetPassword_endpoint,
      payload: {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email })
      }
    })
  },
  /**
   * Login user and return user profile and current token
   */
  login (context, { username, password }) {
    let url = rootStore.state.config.users.login_endpoint
    if (rootStore.state.config.storeViews.multistore) {
      url = adjustMultistoreApiUrl(url)
    }
    return fetch(url, { method: 'POST',
      mode: 'cors',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username: username, password: password })
    }).then(resp => { return resp.json() })
      .then((resp) => {
        if (resp.code === 200) {
          rootStore.state.userTokenInvalidateLock = 0
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
    let url = rootStore.state.config.users.create_endpoint
    if (rootStore.state.config.storeViews.multistore) {
      url = adjustMultistoreApiUrl(url)
    }
    return fetch(url, { method: 'POST',
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
      const usersCollection = Vue.prototype.$db.usersCollection
      usersCollection.getItem('current-refresh-token', (err, refreshToken) => {
        if (err) {
          Logger.error(err, 'user')()
        }
        let url = rootStore.state.config.users.refresh_endpoint
        if (rootStore.state.config.storeViews.multistore) {
          url = adjustMultistoreApiUrl(url)
        }
        return fetch(url, { method: 'POST',
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
   * Update user groupToken and groupId in state
   * @param context
   * @param userData
   */
  setUserGroup(context, userData) {
    if (rootStore.state.config.usePriceTiers) {
      if (userData.groupToken) {
        context.commit(types.USER_GROUP_TOKEN_CHANGED, userData.groupToken)
      }

      if (userData.group_id) {
        context.commit(types.USER_GROUP_CHANGED, userData.group_id)
      }
    } else {
      context.commit(types.USER_GROUP_TOKEN_CHANGED, '')
      context.commit(types.USER_GROUP_CHANGED, null)
    }
  },
  /**
   * Load current user profile
   */
  me (context, { refresh = true, useCache = true } = {}) {
    return new Promise((resolve, reject) => {
      if (!context.state.token) {
        Logger.warn('No User token, user unauthorized', 'user')()
        return resolve(null)
      }
      const cache = Vue.prototype.$db.usersCollection
      let resolvedFromCache = false

      if (useCache === true) { // after login for example we shouldn't use cache to be sure we're loading currently logged in user
        cache.getItem('current-user', (err, res) => {
          if (err) {
            Logger.error(err, 'user')()
            return
          }

          if (res) {
            context.commit(types.USER_INFO_LOADED, res)
            context.dispatch('setUserGroup', res)
            Vue.prototype.$bus.$emit('user-after-loggedin', res)
            rootStore.dispatch('cart/userAfterLoggedin')

            resolve(res)
            resolvedFromCache = true
            Logger.log('Current user served from cache', 'user')()
          }
        })
      }

      if (refresh) {
        TaskQueue.execute({ url: rootStore.state.config.users.me_endpoint,
          payload: { method: 'GET',
            mode: 'cors',
            headers: {
              'Accept': 'application/json, text/plain, */*',
              'Content-Type': 'application/json'
            }
          }
        })
          .then((resp: any) => {
            if (resp.resultCode === 200) {
              context.commit(types.USER_INFO_LOADED, resp.result) // this also stores the current user to localForage
              context.dispatch('setUserGroup', resp.result)
            }
            if (!resolvedFromCache && resp.resultCode === 200) {
              Vue.prototype.$bus.$emit('user-after-loggedin', resp.result)
              rootStore.dispatch('cart/userAfterLoggedin')
              resolve(resp)
            } else {
              resolve(null)
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
  async update (context, userData:UserProfile) {
    await TaskQueue.queue({ url: rootStore.state.config.users.me_endpoint,
      payload: {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        mode: 'cors',
        body: JSON.stringify(userData)
      },
      callback_event: 'store:user/userAfterUpdate'
    })
  },
  refreshCurrentUser (context, userData) {
    context.commit(types.USER_INFO_LOADED, userData)
  },
  /**
   * Change user password
   */
  changePassword (context, passwordData) {
    return TaskQueue.execute({ url: rootStore.state.config.users.changePassword_endpoint,
      payload: {
        method: 'POST',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(passwordData)
      }
    }).then((resp: any) => {
      if (resp.code === 200) {
        rootStore.dispatch('notification/spawnNotification', {
          type: 'success',
          message: 'Password has successfully been changed',
          action1: { label: i18n.t('OK') }
        })

        rootStore.dispatch('user/login', {
          username: context.state.current.email,
          password: passwordData.newPassword
        })
      } else {
        rootStore.dispatch('notification/spawnNotification', {
          type: 'error',
          message: i18n.t(resp.result),
          action1: { label: i18n.t('OK') }
        })
      }
    })
  },
  clearCurrentUser (context) {
      context.commit(types.USER_GROUP_TOKEN_CHANGED, '')
      context.commit(types.USER_GROUP_CHANGED, null)
      context.commit(types.USER_INFO_LOADED, null)
      context.dispatch('wishlist/clear', null, {root: true})
      context.dispatch('checkout/savePersonalDetails', {}, {root: true})
      context.dispatch('checkout/saveShippingDetails', {}, {root: true})
      context.dispatch('checkout/savePaymentDetails', {}, {root: true})
  },
  /**
   * Logout user
   */
  logout (context, { silent = false }) {
    context.commit(types.USER_END_SESSION)
    context.dispatch('cart/serverTokenClear', {}, { root: true })
        .then(() => {context.dispatch('clearCurrentUser')})
        .then(() => {Vue.prototype.$bus.$emit('user-after-logout')})
        .then(() => {context.dispatch('cart/clear', {}, { root: true })})
    if (!silent) {
      rootStore.dispatch('notification/spawnNotification', {
        type: 'success',
        message: i18n.t("You're logged out"),
        action1: { label: i18n.t('OK') }
      })
    }
    const usersCollection = Vue.prototype.$db.usersCollection
    usersCollection.setItem('current-token', '')

    if (rootStore.state.route.path === '/my-account') {
      // router.push('/')
    }
  },
  /**
   * Load user's orders history
   */
  getOrdersHistory (context, { refresh = true, useCache = true }) {
    // TODO: Make it as an extension from users module
    return new Promise((resolve, reject) => {
      if (!context.state.token) {
        Logger.debug('No User token, user unathorized', 'user')()
        return resolve(null)
      }
      const cache = Vue.prototype.$db.ordersHistoryCollection
      let resolvedFromCache = false

      if (useCache === true) { // after login for example we shouldn't use cache to be sure we're loading currently logged in user
        cache.getItem('orders-history', (err, res) => {
          if (err) {
            Logger.error(err, 'user')()
            return
          }

          if (res) {
            context.commit(types.USER_ORDERS_HISTORY_LOADED, res)
            Vue.prototype.$bus.$emit('user-after-loaded-orders', res)

            resolve(res)
            resolvedFromCache = true
            Logger.log('Current user order history served from cache', 'user')()
          }
        })
      }

      if (refresh) {
        return TaskQueue.execute({ url: rootStore.state.config.users.history_endpoint,
          payload: { method: 'GET',
            mode: 'cors',
            headers: {
              'Accept': 'application/json, text/plain, */*',
              'Content-Type': 'application/json'
            }
          }
        }).then((resp: any) => {
          if (resp.code === 200) {
            context.commit(types.USER_ORDERS_HISTORY_LOADED, resp.result) // this also stores the current user to localForage
            Vue.prototype.$bus.$emit('user-after-loaded-orders', resp.result)
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
  userAfterUpdate(context, event) {
    if (event.resultCode === 200) {
      rootStore.dispatch('notification/spawnNotification', {
        type: 'success',
        message: i18n.t('Account data has successfully been updated'),
        action1: { label: i18n.t('OK') }
      })
      rootStore.dispatch('user/refreshCurrentUser', event.result)
    }
  },
  sessionAfterAuthorized (context, event) {
    Logger.info('User session authorised ', 'user')()
    rootStore.dispatch('user/me', { refresh: navigator.onLine }, { root: true }).then((us) => {}) // this will load user cart
    rootStore.dispatch('user/getOrdersHistory', { refresh: navigator.onLine }, { root: true }).then((us) => {})
  }
}

export default actions
