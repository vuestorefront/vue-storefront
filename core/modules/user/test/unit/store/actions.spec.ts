import * as types from '../../../store/mutation-types'
import * as data from './data'
import userActions from '../../../store/actions'
import { StorageManager } from '@vue-storefront/core/lib/storage-manager'
import { UserService } from '@vue-storefront/core/data-resolver'
import EventBus from '@vue-storefront/core/compatibility/plugins/event-bus'

jest.mock('@vue-storefront/i18n', () => ({ t: jest.fn(str => str) }));
jest.mock('@vue-storefront/core/lib/logger', () => ({
  Logger: {
    log: jest.fn(() => () => {
    }),
    debug: jest.fn(() => () => {
    }),
    warn: jest.fn(() => () => {
    }),
    error: jest.fn(() => () => {
    }),
    info: jest.fn(() => () => {
    })
  }
}));
jest.mock('@vue-storefront/core/lib/multistore', () => ({
  currentStoreView: jest.fn(() => ({
    storeCode: '2',
    currentStoreView: jest.fn(),
    localizedRoute: jest.fn()
  }))
}));
jest.mock('@vue-storefront/core/helpers', () => ({
  get isServer () {
    return false
  },
  onlineHelper: {
    isOnline: true
  }
}));
jest.mock('@vue-storefront/core/lib/storage-manager', () => ({
  StorageManager: {
    get: jest.fn()
  }
}));
jest.mock('@vue-storefront/core/data-resolver', () => ({
  UserService: {
    login: jest.fn(),
    register: jest.fn(),
    resetPassword: jest.fn(),
    refreshToken: jest.fn(),
    updateProfile: jest.fn(),
    changePassword: jest.fn(),
    getOrdersHistory: jest.fn()
  }
}));
EventBus.$emit = jest.fn()

describe('User actions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('startSession action', () => {
    it('should NOT set user info', async () => {
      (StorageManager.get as jest.Mock).mockImplementation(() => ({
        getItem: async () => (data.user)
      }));

      const contextMock = {
        commit: jest.fn(),
        dispatch: jest.fn(),
        getters: { isLocalDataLoaded: true }
      };
      const wrapper = (actions: any) => actions.startSession(contextMock);

      await wrapper(userActions);

      expect(contextMock.commit).not.toBeCalledWith(types.USER_INFO_LOADED, data.user)
    })
    it('should star user session', async () => {
      (StorageManager.get as jest.Mock).mockImplementation(() => ({
        getItem: async () => (data.user)
      }));

      const contextMock = {
        commit: jest.fn(),
        dispatch: jest.fn(),
        getters: { isLocalDataLoaded: false }
      };
      const wrapper = (actions: any) => actions.startSession(contextMock);

      await wrapper(userActions);

      expect(contextMock.commit).toBeCalledWith(types.USER_LOCAL_DATA_LOADED, true)
      expect(contextMock.commit).toBeCalledWith(types.USER_INFO_LOADED, data.user)
      expect(contextMock.commit).toBeCalledWith(types.USER_START_SESSION)
    })
    it('should set user token', async () => {
      (StorageManager.get as jest.Mock).mockImplementation(() => ({
        getItem: async () => (data.lastUserToken)
      }));

      const contextMock = {
        commit: jest.fn(),
        dispatch: jest.fn(),
        getters: { isLocalDataLoaded: false }
      };
      const wrapper = (actions: any) => actions.startSession(contextMock);

      await wrapper(userActions);

      expect(contextMock.commit).toBeCalledWith(types.USER_TOKEN_CHANGED, { newToken: data.lastUserToken })
    })
    it('should call setUserGroup action', async () => {
      (StorageManager.get as jest.Mock).mockImplementation(() => ({
        getItem: async () => (data.user)
      }));

      const contextMock = {
        commit: jest.fn(),
        dispatch: jest.fn(),
        getters: { isLocalDataLoaded: false }
      };
      const wrapper = (actions: any) => actions.startSession(contextMock);

      await wrapper(userActions);

      expect(contextMock.dispatch).toBeCalledWith('setUserGroup', data.user)
    })
    it('should emit session-after-nonauthorized', async () => {
      (StorageManager.get as jest.Mock).mockImplementation(() => ({
        getItem: async () => (null)
      }));

      const contextMock = {
        commit: jest.fn(),
        dispatch: jest.fn(),
        getters: { isLocalDataLoaded: false }
      };
      const wrapper = (actions: any) => actions.startSession(contextMock);

      await wrapper(userActions);

      expect(EventBus.$emit).toBeCalledWith('session-after-nonauthorized')
    })
  });

  describe('resetPassword action', () => {
    it('should return response from resetPassword', () => {
      (UserService.resetPassword as jest.Mock).mockImplementation(() =>
        (data.responseOb)
      );

      const contextMock = {
        commit: jest.fn(),
        dispatch: jest.fn(),
        getters: { isLocalDataLoaded: false }
      };
      const email = data.email;
      const result = (userActions as any).resetPassword(contextMock, { email });

      expect(result).toEqual(data.responseOb)
    })
  });

  describe('login action', () => {
    it('should return login response', async () => {
      (UserService.login as jest.Mock).mockImplementation(async () =>
        (data.responseOb)
      );

      const contextMock = {
        commit: jest.fn(),
        dispatch: jest.fn(),
        getters: { isLocalDataLoaded: false }
      };
      const refreshValue = data.refresh;
      const useCacheValue = !data.useCache;
      const rootValue = true;
      const username = data.username;
      const password = data.password;
      const result = await (userActions as any).login(contextMock, { username, password });

      expect(contextMock.dispatch).toHaveBeenNthCalledWith(1, 'resetUserInvalidateLock', {}, { root: rootValue })
      expect(contextMock.commit).toHaveBeenCalledWith(types.USER_TOKEN_CHANGED, {
        newToken: data.responseOb.result,
        meta: data.responseOb.meta
      })
      expect(contextMock.dispatch).toHaveBeenNthCalledWith(2, 'sessionAfterAuthorized', {
        refresh: refreshValue,
        useCache: useCacheValue
      })
      expect(contextMock.dispatch).not.toBeCalledWith('clearCurrentUser');
      expect(result).toEqual(data.responseOb)
    })
  });

  describe('register action', () => {
    it('should return response from register', async () => {
      (UserService.register as jest.Mock).mockImplementation(async () =>
        (data.responseOb)
      );

      const contextMock = {
        commit: jest.fn(),
        dispatch: jest.fn(),
        getters: { isLocalDataLoaded: false }
      };
      const password = data.password;
      const customer = data.customer;
      const result = await (userActions as any).register(contextMock, { password, customer });

      expect(result).toEqual(data.responseOb)
    })
  });

  describe('refresh action', () => {
    it('should update user token', async () => {
      (StorageManager.get as jest.Mock).mockImplementation(() => ({
        getItem: async () => (data.lastUserToken)
      }));
      (UserService.refreshToken as jest.Mock).mockImplementation(async () =>
        (data.lastUserToken)
      )

      const contextMock = {
        commit: jest.fn()
      }
      const newToken = data.lastUserToken
      const result = await (userActions as any).refresh(contextMock)

      expect(contextMock.commit).toBeCalledWith(types.USER_TOKEN_CHANGED, { newToken });
      expect(result).toEqual(newToken)
    })
  });

  describe('setUserGroup action', () => {
    it('should update user groupToken and groupId in state', () => {
      const contextMock = {
        commit: jest.fn()
      }
      const wrapper = (actions: any) => actions.setUserGroup(contextMock, data.user);

      wrapper(userActions);

      expect(contextMock.commit).toHaveBeenNthCalledWith(1, types.USER_GROUP_TOKEN_CHANGED, data.user.groupToken)
      expect(contextMock.commit).toHaveBeenNthCalledWith(2, types.USER_GROUP_CHANGED, data.user.group_id)
    })
  });

  describe('restoreCurrentUserFromCache', () => {
    it('should restore current user from cache', async () => {
      (StorageManager.get as jest.Mock).mockImplementation(() => ({
        getItem: async () => (data.user)
      }));

      const contextMock = {
        commit: jest.fn(),
        dispatch: jest.fn(),
        getters: { isLocalDataLoaded: false }
      };
      const result = await (userActions as any).restoreCurrentUserFromCache(contextMock)

      expect(contextMock.commit).toHaveBeenCalledWith(types.USER_INFO_LOADED, data.user)
      expect(contextMock.dispatch).toHaveBeenNthCalledWith(1, 'setUserGroup', data.user)
      expect(contextMock.dispatch).toHaveBeenNthCalledWith(2, 'cart/authorize', {}, { root: true })
      expect(result).toEqual(data.user)
    })
    it('should return null if is not cached', async () => {
      const contextMock = {
        commit: jest.fn(),
        dispatch: jest.fn(),
        getters: { isLocalDataLoaded: false }
      };
      const result = await (userActions as any).restoreCurrentUserFromCache(contextMock)

      expect(result).toEqual(data.user)
    })
  });

  describe('me action', () => {
    it('should NOT dispatch restoreCurrentUserFromCache', async () => {
      const contextMock = {
        dispatch: jest.fn(),
        getters: jest.fn()
      }

      await (userActions as any).me(contextMock)

      expect(contextMock.dispatch).not.toBeCalledWith('restoreCurrentUserFromCache')
    })
    it('should load current user profile if getToken is not empty', async () => {
      const contextMock = {
        dispatch: jest.fn(),
        getters: { getToken: data.lastUserToken }
      }
      const resolvedFromCache = !data.resolvedFromCache

      await (userActions as any).me(contextMock)

      expect(contextMock.dispatch).toHaveBeenNthCalledWith(1, 'restoreCurrentUserFromCache')
      expect(contextMock.dispatch).toHaveBeenNthCalledWith(2, 'refreshUserProfile', { resolvedFromCache })
    })
  });

  describe('update action', () => {
    it('should set current result if resultCode from response is 200', async () => {
      const responseOb = {
        resultCode: 200,
        result: 200
      };
      const contextMock = {
        dispatch: jest.fn()
      }

      await (userActions as any).handleUpdateProfile(contextMock, responseOb)

      expect(contextMock.dispatch).toHaveBeenCalledWith('user/setCurrentUser', responseOb.result, { root: true })
    })
  });

  describe('setCurrentUser action', () => {
    it('should set current user', () => {
      const contextMock = {
        commit: jest.fn()
      };

      (userActions as any).setCurrentUser(contextMock, data.user)

      expect(contextMock.commit).toBeCalledWith(types.USER_INFO_LOADED, data.user)
    })
  });

  describe('changePassword action', () => {
    it('should call login action if response code is 200', async () => {
      (UserService.changePassword as jest.Mock).mockImplementation(async () =>
        (data.responseOb)
      );

      const contextMock = {
        dispatch: jest.fn(),
        getters: { getUserEmail: data.email }
      }
      const passwordData = {
        currentPassword: data.password,
        newPassword: 'newPassword1'
      }

      await (userActions as any).changePassword(contextMock, passwordData)

      expect(contextMock.dispatch).toBeCalledWith('login', {
        username: data.user.email,
        password: passwordData.newPassword
      })
    })
    it('should call spawnNotification if response code is not 200', async () => {
      const responseOb = {
        code: 400,
        result: {
          errorMessage: 'Error'
        }
      };
      (UserService.changePassword as jest.Mock).mockImplementation(async () =>
        (responseOb)
      );

      const contextMock = {
        dispatch: jest.fn()
      }
      const passwordData = {
        currentPassword: data.password,
        newPassword: 'newPassword1'
      }

      await (userActions as any).changePassword(contextMock, passwordData)

      expect(contextMock.dispatch).toBeCalledWith('notification/spawnNotification', {
        type: 'error',
        message: responseOb.result.errorMessage,
        action1: { label: 'OK' }
      }, { root: true })
    })
  });

  describe('clearCurrentUser action', () => {
    it('should clear current user', () => {
      const contextMock = {
        commit: jest.fn(),
        dispatch: jest.fn()
      };

      (userActions as any).clearCurrentUser(contextMock)

      expect(contextMock.commit).toHaveBeenNthCalledWith(1, types.USER_TOKEN_CHANGED, '')
      expect(contextMock.commit).toHaveBeenNthCalledWith(2, types.USER_GROUP_TOKEN_CHANGED, '')
      expect(contextMock.commit).toHaveBeenNthCalledWith(3, types.USER_GROUP_CHANGED, null)
      expect(contextMock.commit).toHaveBeenNthCalledWith(4, types.USER_INFO_LOADED, null)
      expect(contextMock.dispatch).toHaveBeenNthCalledWith(1, 'wishlist/clear', null, { root: true })
      expect(contextMock.dispatch).toHaveBeenNthCalledWith(2, 'compare/clear', null, { root: true })
      expect(contextMock.dispatch).toHaveBeenNthCalledWith(3, 'checkout/savePersonalDetails', {}, { root: true })
      expect(contextMock.dispatch).toHaveBeenNthCalledWith(4, 'checkout/saveShippingDetails', {}, { root: true })
      expect(contextMock.dispatch).toHaveBeenNthCalledWith(5, 'checkout/savePaymentDetails', {}, { root: true })
    })
  });

  describe('logout action', () => {
    it('should logout user', async () => {
      const contextMock = {
        commit: jest.fn(),
        dispatch: jest.fn()
      };
      const silent = false

      await (userActions as any).logout(contextMock, silent)

      expect(contextMock.commit).toBeCalledWith(types.USER_END_SESSION)
      expect(contextMock.dispatch).toHaveBeenNthCalledWith(1, 'cart/disconnect', {}, { root: true })
      expect(contextMock.dispatch).toHaveBeenNthCalledWith(2, 'clearCurrentUser')
      expect(contextMock.dispatch).toHaveBeenNthCalledWith(3, 'cart/clear', { sync: false }, { root: true })
      expect(contextMock.dispatch).toHaveBeenNthCalledWith(4, 'notification/spawnNotification', {
        type: 'success',
        message: "You're logged out",
        action1: { label: 'OK' }
      }, { root: true })
    })
  });

  describe('loadOrdersFromCache action', () => {
    it('should return ordersHistory', async () => {
      (StorageManager.get as jest.Mock).mockImplementation(() => ({
        getItem: async () => (data.ordersHistory)
      }));

      const contextMock = {
        commit: jest.fn()
      }

      const result = await (userActions as any).loadOrdersFromCache(contextMock)

      expect(contextMock.commit).toBeCalledWith(types.USER_ORDERS_HISTORY_LOADED, data.ordersHistory)
      expect(result).toBe(data.ordersHistory)
    })
  });

  describe('refreshOrderHistory action', () => {
    it('should refresh orders history', async () => {
      const responseOb = {
        result: data.ordersHistory,
        code: 200
      };
      (UserService.getOrdersHistory as jest.Mock).mockImplementation(async () =>
        (responseOb)
      );

      const contextMock = {
        commit: jest.fn()
      }
      const resolvedFromCache = data.resolvedFromCache;
      const pageSize = data.pageSize;
      const currentPage = data.currentPage;
      const result = await (userActions as any).refreshOrdersHistory(contextMock, {
        resolvedFromCache,
        pageSize,
        currentPage
      })

      expect(contextMock.commit).toBeCalledWith(types.USER_ORDERS_HISTORY_LOADED, responseOb.result)
      expect(result).toBe(responseOb)
    })
  });

  describe('getOrdersHistory action', () => {
    it('should return null from the resolved promise if getToken is empty', async () => {
      const contextMock = {
        dispatch: jest.fn(),
        getters: {
          getToken: null
        }
      }
      const refresh = data.refresh;
      const useCache = data.useCache;
      const pageSize = data.pageSize;
      const currentPage = data.currentPage;
      const result = await (userActions as any).getOrdersHistory(contextMock, {
        refresh,
        useCache,
        pageSize,
        currentPage
      })

      expect(result).toBe(null)
    })
    it('should dispatch loadOrdersFromCache if useCache is set to true and refreshOrdersHistory action if refresh is set to true', async () => {
      const contextMock = {
        dispatch: jest.fn(),
        getters: {
          dispatch: jest.fn(),
          getToken: data.lastUserToken
        }
      }
      const refresh = data.refresh;
      const useCache = data.useCache;
      const pageSize = data.pageSize;
      const resolvedFromCache = data.resolvedFromCache;
      const currentPage = data.currentPage;

      contextMock.dispatch.mockImplementationOnce(() => Promise.resolve(data.ordersHistory))

      await (userActions as any).getOrdersHistory(contextMock, { refresh, useCache, pageSize, currentPage })

      expect(contextMock.dispatch).toHaveBeenNthCalledWith(1, 'loadOrdersFromCache')
      expect(contextMock.dispatch).toHaveBeenNthCalledWith(2, 'refreshOrdersHistory', {
        resolvedFromCache,
        pageSize,
        currentPage
      })
    })
  });

  describe('sessionAfterAuthorized action', () => {
    it('should call me and getOrdersHistory after authorized', async () => {
      const contextMock = {
        dispatch: jest.fn()
      }
      const refresh = data.refresh;
      const useCache = data.useCache;

      await (userActions as any).sessionAfterAuthorized(contextMock, { refresh, useCache })

      expect(contextMock.dispatch).toHaveBeenNthCalledWith(1, 'me', { refresh, useCache })
      expect(contextMock.dispatch).toHaveBeenNthCalledWith(2, 'getOrdersHistory', { refresh, useCache })
    })
  })
})
