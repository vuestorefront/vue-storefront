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
        resetPassword: jest.fn()
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
            "id": 58,
            "group_id": 1,
            "default_billing": "62",
            "default_shipping": "48",
            "created_at": "2018-01-23 15:30:00",
            "updated_at": "2018-03-04 06:39:28",
            "created_in": "Default Store View",
            "email": "examplename@example.com",
            "firstname": "ExampleFirstName",
            "lastname": "ExampleLastName",
            "store_id": 1,
            "website_id": 1,
            "addresses": [
                {
                    "id": 48,
                    "customer_id": 58,
                    "region": {
                        "region_code": null,
                        "region": null,
                        "region_id": 0
                    },
                    "region_id": 0,
                    "country_id": "CountryId",
                    "street": ["Street", "12"],
                    "telephone": "",
                    "postcode": "51-169",
                    "city": "City",
                    "firstname": "ExampleFirstName",
                    "lastname": "ExampleLastName",
                    "default_shipping": true
                },
                {
                    "id": 62,
                    "customer_id": 58,
                    "region": {
                        "region_code": null,
                        "region": null,
                        "region_id": 0
                    },
                    "region_id": 0,
                    "country_id": "CountryId",
                    "street": ["Street", "12"],
                    "company": "example",
                    "telephone": "",
                    "postcode": "51-169",
                    "city": "City",
                    "firstname": "ExampleFirstName",
                    "lastname": "ExampleLastName",
                    "vat_id": "vatidhere42342",
                    "default_billing": true
                }
            ],
            "disable_auto_group_change": 0
        };
        lastUserToken = 'current-token';
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
})
