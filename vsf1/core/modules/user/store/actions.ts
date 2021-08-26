import { ActionTree } from 'vuex'
import * as types from './mutation-types'
import i18n from '@vue-storefront/i18n'
import RootState from '@vue-storefront/core/types/RootState'
import UserState from '../types/UserState'
import { Logger } from '@vue-storefront/core/lib/logger'
import { UserProfile } from '../types/UserProfile'
import { onlineHelper } from '@vue-storefront/core/helpers'
import { isServer } from '@vue-storefront/core/helpers'
import { UserService } from '@vue-storefront/core/data-resolver'
import EventBus from '@vue-storefront/core/compatibility/plugins/event-bus'
import { StorageManager } from '@vue-storefront/core/lib/storage-manager'
import { userHooksExecutors, userHooks } from '../hooks'
import { isModuleRegistered } from '@vue-storefront/core/lib/modules'
import Task from '@vue-storefront/core/lib/sync/types/Task'
import uniqBy from 'lodash-es/uniqBy'

const actions: ActionTree<UserState, RootState> = {
  async startSession ({ commit, dispatch, getters }) {
    const usersCollection = StorageManager.get('user')
    const userData = await usersCollection.getItem('current-user')

    if (isServer || getters.isLocalDataLoaded) return
    commit(types.USER_LOCAL_DATA_LOADED, true)

    if (userData) {
      commit(types.USER_INFO_LOADED, userData)
    }

    commit(types.USER_START_SESSION)
    const lastUserToken = await usersCollection.getItem('current-token')

    if (lastUserToken) {
      commit(types.USER_TOKEN_CHANGED, { newToken: lastUserToken })
      await dispatch('sessionAfterAuthorized', {})

      if (userData) {
        dispatch('setUserGroup', userData)
      }
    } else {
      EventBus.$emit('session-after-nonauthorized')
    }

    EventBus.$emit('session-after-started')
  },
  /**
   * Send password reset link for specific e-mail
   */
  resetPassword (context, { email }) {
    return UserService.resetPassword(email)
  },
  /**
   * Create new password for provided email with resetToken
   * We could receive resetToken by running user.resetPassword action
   */
  createPassword (context, { email, newPassword, resetToken }) {
    return UserService.createPassword(email, newPassword, resetToken)
  },
  /**
   * Login user and return user profile and current token
   */
  async login ({ commit, dispatch }, { username, password }) {
    await dispatch('resetUserInvalidation', {}, { root: true })

    const resp = await UserService.login(username, password)
    userHooksExecutors.afterUserAuthorize(resp)

    if (resp.code === 200) {
      try {
        commit(types.USER_TOKEN_CHANGED, { newToken: resp.result, meta: resp.meta }) // TODO: handle the "Refresh-token" header
        await dispatch('sessionAfterAuthorized', { refresh: true, useCache: false })
      } catch (err) {
        await dispatch('clearCurrentUser')
        throw new Error(err)
      }
    }

    return resp
  },
  /**
   * Login user and return user profile and current token
   */
  async register (context, { password, ...customer }) {
    return UserService.register(customer, password)
  },

  /**
  * Invalidate user token
  */
  async refresh ({ commit }) {
    const usersCollection = StorageManager.get('user')
    const refreshToken = await usersCollection.getItem('current-refresh-token')
    const newToken = await UserService.refreshToken(refreshToken)

    if (newToken) {
      commit(types.USER_TOKEN_CHANGED, { newToken })
    }

    return newToken
  },
  /**
   * Update user groupToken and groupId in state
   * @param context
   * @param userData
   */
  setUserGroup ({ commit }, userData) {
    if (userData.groupToken) {
      commit(types.USER_GROUP_TOKEN_CHANGED, userData.groupToken)
    }

    if (userData.group_id) {
      commit(types.USER_GROUP_CHANGED, userData.group_id)
    }
  },
  async restoreCurrentUserFromCache ({ commit, dispatch }) {
    const usersCollection = StorageManager.get('user')
    const currentUser = await usersCollection.getItem('current-user')

    if (currentUser) {
      commit(types.USER_INFO_LOADED, currentUser)
      await dispatch('setUserGroup', currentUser)
      EventBus.$emit('user-after-loggedin', currentUser)
      dispatch('cart/authorize', {}, { root: true })

      return currentUser
    }

    return null
  },
  async refreshUserProfile ({ commit, dispatch }, { resolvedFromCache }) {
    const resp = await UserService.getProfile()

    if (resp.resultCode === 200) {
      commit(types.USER_INFO_LOADED, resp.result) // this also stores the current user to localForage
      await dispatch('setUserGroup', resp.result)
    }

    if (!resolvedFromCache && resp.resultCode === 200) {
      EventBus.$emit('user-after-loggedin', resp.result)
      await dispatch('cart/authorize', {}, { root: true })
      return resp
    }
  },
  /**
   * Load current user profile
   */
  async me ({ dispatch, getters }, { refresh = true, useCache = true } = {}) {
    if (!getters.getToken) {
      Logger.warn('No User token, user unauthorized', 'user')()
      return
    }

    let resolvedFromCache = false

    if (useCache) {
      const currentUser = await dispatch('restoreCurrentUserFromCache')

      if (currentUser) {
        resolvedFromCache = true
        Logger.log('Current user served from cache', 'user')()
      }
    }

    if (refresh) {
      return dispatch('refreshUserProfile', { resolvedFromCache })
    }
  },
  /**
   * Update user profile with data from My Account page
   */
  async update (_, profile: UserProfile) {
    profile = userHooksExecutors.beforeUserProfileUpdate(profile)
    await UserService.updateProfile(profile, 'user/handleUpdateProfile')
  },
  async handleUpdateProfile ({ dispatch }, event: Task) {
    if (event.resultCode === 200) {
      dispatch('notification/spawnNotification', {
        type: 'success',
        message: i18n.t('Account data has successfully been updated'),
        action1: { label: i18n.t('OK') }
      }, { root: true })
      dispatch('user/setCurrentUser', event.result, { root: true })
    }
    userHooksExecutors.afterUserProfileUpdated(event)
  },
  setCurrentUser ({ commit }, userData) {
    commit(types.USER_INFO_LOADED, userData)
  },
  /**
   * Change user password
   */
  async changePassword ({ dispatch, getters }, passwordData) {
    if (!onlineHelper.isOnline) {
      dispatch('notification/spawnNotification', {
        type: 'error',
        message: i18n.t('Reset password feature does not work while offline!'),
        action1: { label: i18n.t('OK') }
      }, { root: true })

      return
    }

    const resp = await UserService.changePassword(passwordData)

    if (resp.code === 200) {
      await dispatch('notification/spawnNotification', {
        type: 'success',
        message: i18n.t('Password has successfully been changed'),
        action1: { label: i18n.t('OK') }
      }, { root: true })
      await dispatch('login', {
        username: getters.getUserEmail,
        password: passwordData.newPassword
      })
    } else {
      await dispatch('notification/spawnNotification', {
        type: 'error',
        message: i18n.t(resp.result.errorMessage),
        action1: { label: i18n.t('OK') }
      }, { root: true })
    }
  },
  clearCurrentUser ({ commit, dispatch }) {
    commit(types.USER_TOKEN_CHANGED, { newToken: null })
    commit(types.USER_GROUP_TOKEN_CHANGED, '')
    commit(types.USER_GROUP_CHANGED, null)
    commit(types.USER_INFO_LOADED, null)
    if (isModuleRegistered('WishlistModule')) dispatch('wishlist/clear', null, { root: true })
    if (isModuleRegistered('CompareModule')) dispatch('compare/clear', null, { root: true })
    dispatch('checkout/savePersonalDetails', {}, { root: true })
    dispatch('checkout/saveShippingDetails', {}, { root: true })
    dispatch('checkout/savePaymentDetails', {}, { root: true })
    commit(types.USER_ORDERS_HISTORY_LOADED, {})
    StorageManager
      .get('user')
      .setItem('current-refresh-token', null)
      .catch((reason) => {
        Logger.error(reason)()
      })
  },
  /**
   * Logout user
   */
  async logout ({ commit, dispatch }, { silent = false }) {
    commit(types.USER_END_SESSION)
    await dispatch('cart/disconnect', {}, { root: true })
    await dispatch('clearCurrentUser')
    EventBus.$emit('user-after-logout')
    // clear cart without sync, because after logout we don't want to clear cart on backend
    // user should have items when he comes back
    await dispatch('cart/clear', { sync: false }, { root: true })

    if (!silent) {
      await dispatch('notification/spawnNotification', {
        type: 'success',
        message: i18n.t("You're logged out"),
        action1: { label: i18n.t('OK') }
      }, { root: true })
    }
    userHooksExecutors.afterUserUnauthorize()
  },
  async loadOrdersFromCache ({ commit }) {
    const ordersHistoryCollection = StorageManager.get('user')
    const ordersHistory = await ordersHistoryCollection.getItem('orders-history')

    if (ordersHistory) {
      commit(types.USER_ORDERS_HISTORY_LOADED, ordersHistory)
      EventBus.$emit('user-after-loaded-orders', ordersHistory)

      return ordersHistory
    }
  },
  async appendOrdersHistory ({ commit, getters }, { pageSize = 20, currentPage = 1 }) {
    const resp = await UserService.getOrdersHistory(pageSize, currentPage)

    if (resp.code === 200) {
      const oldOrders = getters.getOrdersHistory;
      let orders = resp.result;
      if (oldOrders && orders.items) orders.items = uniqBy([...oldOrders, ...orders.items], 'increment_id')

      commit(types.USER_ORDERS_HISTORY_LOADED, orders)
      EventBus.$emit('user-after-loaded-orders', orders)
      return orders
    }
  },
  async refreshOrdersHistory ({ commit }, { resolvedFromCache, pageSize = 20, currentPage = 1 }) {
    const resp = await UserService.getOrdersHistory(pageSize, currentPage)

    if (resp.code === 200) {
      commit(types.USER_ORDERS_HISTORY_LOADED, resp.result) // this also stores the current user to localForage
      EventBus.$emit('user-after-loaded-orders', resp.result)
    }

    if (!resolvedFromCache) {
      Promise.resolve(resp.code === 200 ? resp : null)
    }

    return resp
  },
  /**
   * Load user's orders history
   */
  async getOrdersHistory ({ dispatch, getters }, { refresh = true, useCache = true, pageSize = 20, currentPage = 1 }) {
    if (!getters.getToken) {
      Logger.debug('No User token, user unauthorized', 'user')()
      return Promise.resolve(null)
    }
    let resolvedFromCache = false

    if (useCache) {
      const ordersHistory = await dispatch('loadOrdersFromCache')

      if (ordersHistory) {
        resolvedFromCache = true
        Logger.log('Current user order history served from cache', 'user')()
      }
    }

    if (refresh) {
      return dispatch('refreshOrdersHistory', { resolvedFromCache, pageSize, currentPage })
    } else {
      if (!resolvedFromCache) {
        Promise.resolve(null)
      }
    }
  },
  async sessionAfterAuthorized ({ dispatch }, { refresh = onlineHelper.isOnline, useCache = true }) {
    Logger.info('User session authorised ', 'user')()
    await dispatch('me', { refresh, useCache })
    await dispatch('getOrdersHistory', { refresh, useCache })
  }
}

export default actions
