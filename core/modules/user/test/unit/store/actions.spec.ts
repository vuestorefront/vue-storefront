import * as types from '../../../store/mutation-types'
import userActions from '../../../store/actions'
import { StorageManager } from '@vue-storefront/core/lib/storage-manager'
import { UserService } from '@vue-storefront/core/data-resolver'
import EventBus from '@vue-storefront/core/compatibility/plugins/event-bus'

jest.mock('@vue-storefront/i18n', () => ({ t: jest.fn(str => str) }));
jest.mock('@vue-storefront/core/lib/logger', () => ({
    Logger: {
        log: jest.fn(() => () => { }),
        debug: jest.fn(() => () => { }),
        warn: jest.fn(() => () => { }),
        error: jest.fn(() => () => { }),
        info: jest.fn(() => () => { })
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
    get isServer() {
        return false
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
        changePassword: jest.fn()
    }
}));
EventBus.$emit = jest.fn()

let user;
let lastUserToken;
let responseOb;
let email;
let username;
let password;
let customer;

describe('User actions', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        user = {
            id: 58,
            group_id: 1,
            groupToken: 'group-three',
            default_billing: '62',
            default_shipping: '48',
            created_at: '2018-01-23 15:30:00',
            updated_at: '2018-03-04 06:39:28',
            created_in: 'Default Store View',
            email: 'examplename@example.com',
            firstname: 'ExampleFirstName',
            lastname: 'ExampleLastName',
            store_id: 1,
            website_id: 1,
            addresses: [
                {
                    id: 48,
                    customer_id: 58,
                    region: {
                        region_code: null,
                        region: null,
                        region_id: 0
                    },
                    region_id: 0,
                    country_id: 'CountryId',
                    street: ['Street', '12'],
                    telephone: '',
                    postcode: '51-169',
                    city: 'City',
                    firstname: 'ExampleFirstName',
                    lastname: 'ExampleLastName',
                    default_shipping: true
                },
                {
                    id: 62,
                    customer_id: 58,
                    region: {
                        region_code: null,
                        region: null,
                        region_id: 0
                    },
                    region_id: 0,
                    country_id: 'CountryId',
                    street: ['Street', '12'],
                    company: 'example',
                    telephone: '',
                    postcode: '51-169',
                    city: 'City',
                    firstname: 'ExampleFirstName',
                    lastname: 'ExampleLastName',
                    vat_id: 'vatidhere42342',
                    default_billing: true
                }
            ],
            'disable_auto_group_change': 0
        };
        lastUserToken = 'current-refresh-token';
        responseOb = {
            code: 200,
            result: lastUserToken,
            meta: 'meta'
        };
        username = 'username';
        password = 'Password456';
        email = 'examplename@example.com';
        customer = {
            email: 'examplename@example.com',
            firstname: 'ExampleFirstName',
            lastname: 'ExampleLastName',
            addresses: 'addr'
        }
    });

    describe('startSession action', () => {
        it('should NOT set user info', async () => {
            (StorageManager.get as jest.Mock).mockImplementation(() => ({
                getItem: async () => (user)
            }));

            const contextMock = {
                commit: jest.fn(),
                dispatch: jest.fn(),
                getters: { isLocalDataLoaded: true }
            };
            const wrapper = (actions: any) => actions.startSession(contextMock);

            await wrapper(userActions);

            expect(contextMock.commit).not.toBeCalledWith(types.USER_INFO_LOADED, user)
        })
        it('should star user session', async () => {
            (StorageManager.get as jest.Mock).mockImplementation(() => ({
                getItem: async () => (user)
            }));

            const contextMock = {
                commit: jest.fn(),
                dispatch: jest.fn(),
                getters: { isLocalDataLoaded: false }
            };
            const wrapper = (actions: any) => actions.startSession(contextMock);

            await wrapper(userActions);

            expect(contextMock.commit).toBeCalledWith(types.USER_LOCAL_DATA_LOADED, true)
            expect(contextMock.commit).toBeCalledWith(types.USER_INFO_LOADED, user)
            expect(contextMock.commit).toBeCalledWith(types.USER_START_SESSION)
        })
        it('should set user token', async () => {
            (StorageManager.get as jest.Mock).mockImplementation(() => ({
                getItem: async () => (lastUserToken)
            }));

            const contextMock = {
                commit: jest.fn(),
                dispatch: jest.fn(),
                getters: { isLocalDataLoaded: false }
            };
            const wrapper = (actions: any) => actions.startSession(contextMock);

            await wrapper(userActions);

            expect(contextMock.commit).toBeCalledWith(types.USER_TOKEN_CHANGED, { newToken: lastUserToken })
        })
        it('should call setUserGroup action', async () => {
            (StorageManager.get as jest.Mock).mockImplementation(() => ({
                getItem: async () => (user)
            }));

            const contextMock = {
                commit: jest.fn(),
                dispatch: jest.fn(),
                getters: { isLocalDataLoaded: false }
            };
            const wrapper = (actions: any) => actions.startSession(contextMock);

            await wrapper(userActions);

            expect(contextMock.dispatch).toBeCalledWith('setUserGroup', user)
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
                (responseOb)
            );

            const contextMock = {
                commit: jest.fn(),
                dispatch: jest.fn(),
                getters: { isLocalDataLoaded: false }
            };
            const result = (userActions as any).resetPassword(contextMock, { email });

            expect(result).toEqual(responseOb)
        })
    });

    describe('login action', () => {
        it('should return login response', async () => {
            (UserService.login as jest.Mock).mockImplementation(async () =>
                (responseOb)
            );

            const contextMock = {
                commit: jest.fn(),
                dispatch: jest.fn(),
                getters: { isLocalDataLoaded: false }
            };
            const refreshValue = true;
            const useCacheValue = false;
            const rootValue = true;
            const result = await (userActions as any).login(contextMock, { username, password });

            expect(contextMock.dispatch).toHaveBeenNthCalledWith(1, 'resetUserInvalidateLock', {}, { root: rootValue })
            expect(contextMock.commit).toHaveBeenCalledWith(types.USER_TOKEN_CHANGED, { newToken: responseOb.result, meta: responseOb.meta })
            expect(contextMock.dispatch).toHaveBeenNthCalledWith(2, 'sessionAfterAuthorized', { refresh: refreshValue, useCache: useCacheValue })
            expect(contextMock.dispatch).not.toBeCalledWith('clearCurrentUser');
            expect(result).toEqual(responseOb)
        })
    });

    describe('register action', () => {
        it('should return response from register', async () => {
            (UserService.register as jest.Mock).mockImplementation(async () =>
                (responseOb)
            );

            const contextMock = {
                commit: jest.fn(),
                dispatch: jest.fn(),
                getters: { isLocalDataLoaded: false }
            };
            const result = await (userActions as any).register(contextMock, { password, customer });

            expect(result).toEqual(responseOb)
        })
    });

    describe('refresh action', () => {
        it('should update user token', async () => {
            (StorageManager.get as jest.Mock).mockImplementation(() => ({
                getItem: async () => (lastUserToken)
            }));
            (UserService.refreshToken as jest.Mock).mockImplementation(async () =>
                (lastUserToken)
            )

            const contextMock = {
                commit: jest.fn()
            }
            const newToken = lastUserToken
            const result = await (userActions as any).refresh(contextMock)

            expect(contextMock.commit).toHaveBeenCalledWith(types.USER_TOKEN_CHANGED, { newToken });
            expect(result).toEqual(newToken)
        })
    });

    describe('setUserGroup action', () => {
        it('should update user groupToken and groupId in state', () => {
            const contextMock = {
                commit: jest.fn()
            }
            const wrapper = (actions: any) => actions.setUserGroup(contextMock, user);

            wrapper(userActions);

            expect(contextMock.commit).toHaveBeenNthCalledWith(1, types.USER_GROUP_TOKEN_CHANGED, user.groupToken)
            expect(contextMock.commit).toHaveBeenNthCalledWith(2, types.USER_GROUP_CHANGED, user.group_id)
        })
    });

    describe('restoreCurrentUserFromCache', () => {
        it('should restore current user from cache', async () => {
            (StorageManager.get as jest.Mock).mockImplementation(() => ({
                getItem: async () => (user)
            }));

            const contextMock = {
                commit: jest.fn(),
                dispatch: jest.fn(),
                getters: { isLocalDataLoaded: false }
            };
            const result = await (userActions as any).restoreCurrentUserFromCache(contextMock)

            expect(contextMock.commit).toHaveBeenCalledWith(types.USER_INFO_LOADED, user)
            expect(contextMock.dispatch).toHaveBeenNthCalledWith(1, 'setUserGroup', user)
            expect(contextMock.dispatch).toHaveBeenNthCalledWith(2, 'cart/authorize', {}, { root: true })
            expect(result).toEqual(user)
        })
        it('should return null if is not cached', async () => {
            const contextMock = {
                commit: jest.fn(),
                dispatch: jest.fn(),
                getters: { isLocalDataLoaded: false }
            };
            const result = await (userActions as any).restoreCurrentUserFromCache(contextMock)

            expect(result).toEqual(user)
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
                getters: { getToken: lastUserToken }
            }
            const resolvedFromCache = false

            await (userActions as any).me(contextMock)

            expect(contextMock.dispatch).toHaveBeenNthCalledWith(1, 'restoreCurrentUserFromCache')
            expect(contextMock.dispatch).toHaveBeenNthCalledWith(2, 'refreshUserProfile', { resolvedFromCache })
        })
    });

    describe('update action', () => {
        it('should set current result if resultCode from response is 200', async () => {
            responseOb.resultCode = 200;
            (UserService.updateProfile as jest.Mock).mockImplementation(async () =>
                (responseOb)
            );
            const contextMock = {
                dispatch: jest.fn()
            }

            await (userActions as any).update(contextMock, user)

            expect(contextMock.dispatch).toHaveBeenCalledWith('user/setCurrentUser', responseOb.result, { root: true })
        })
    });

    describe('setCurrentUser action', () => {
        it('should set current user', () => {
            const contextMock = {
                commit: jest.fn()
            };

            (userActions as any).setCurrentUser(contextMock, user)

            expect(contextMock.commit).toBeCalledWith(types.USER_INFO_LOADED, user)
        })
    });

    describe('changePassword action', () => {
        it('should call login action if response code is 200', async () => {
            (UserService.changePassword as jest.Mock).mockImplementation(async () =>
                (responseOb)
            );

            const contextMock = {
                dispatch: jest.fn(),
                getters: { getUserEmail: email }
            }
            const passwordData = {
                currentPassword: password,
                newPassword: 'newPassword1'
            }

            await (userActions as any).changePassword(contextMock, passwordData)

            expect(contextMock.dispatch).toBeCalledWith('login', { username: user.email, password: passwordData.newPassword })
        })
        it('should call spawnNotification if response code is not 200', async () => {
            responseOb.code = 400;
            responseOb.result = {
                errorMessage: 'Error'
            };
            (UserService.changePassword as jest.Mock).mockImplementation(async () =>
                (responseOb)
            );

            const contextMock = {
                dispatch: jest.fn()
            }
            const passwordData = {
                currentPassword: password,
                newPassword: 'newPassword1'
            }

            await (userActions as any).changePassword(contextMock, passwordData)

            expect(contextMock.dispatch).toBeCalledWith('notification/spawnNotification', { type: 'error', message: responseOb.result.errorMessage, action1: { label: 'OK' } }, { root: true })
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
            expect(contextMock.dispatch).toHaveBeenNthCalledWith(3, 'cart/clear', { recreateAndSyncCart: true }, { root: true })
            expect(contextMock.dispatch).toHaveBeenNthCalledWith(4, 'notification/spawnNotification', { type: 'success', message: "You're logged out", action1: { label: 'OK' } }, { root: true })
        })
    });

})
