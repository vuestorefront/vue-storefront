import * as types from '@vue-storefront/core/modules/url/store/mutation-types'
import { cacheStorage } from '@vue-storefront/core/modules/recently-viewed/index'
import { actions as urlActions } from '../../../store/actions'

jest.mock('@vue-storefront/i18n', () => ({ t: jest.fn(str => str) }));
jest.mock('@vue-storefront/core/modules/recently-viewed/index', () => ({
  cacheStorage: {
    getItem: jest.fn(),
    setItem: jest.fn(),
    clear: jest.fn()
  }
}));
jest.mock('@vue-storefront/core/lib/storage-manager', () => ({
  StorageManager: {
    init: jest.fn(),
    get: jest.fn(() => cacheStorage)
  }
}));
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
jest.mock('@vue-storefront/core/modules/url/helpers', () => ({
  preProcessDynamicRoutes: jest.fn(),
  parametrizeRouteData: jest.fn()
}));
jest.mock('config', () => ({}));
jest.mock('@vue-storefront/core/app', () => ({
  router: {
    addRoutes: jest.fn()
  }
}));

let url: string;
let routeData: any;

describe('Url actions', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    url = 'https://www.example.com';
    routeData = 'routeData';
  });

  describe('registerMapping action', () => {
    it('should call register mapping mutation', async () => {
      const contextMock = {
        commit: jest.fn()
      }
      const result = await (urlActions as any).registerMapping(contextMock, { url, routeData });

      expect(contextMock.commit).toBeCalledWith(types.REGISTER_MAPPING, { url, routeData });
      expect(result).toEqual(routeData)
    })
  })

  describe('registerDynamicRoutes action', () => {
    it('should NOT call registerMapping action if dispatcherMap state is empty', async () => {
      const contextMock = {
        state: {
          dispatcherMap: {}
        },
        dispatch: jest.fn()
      }

      const wrapper = (actions: any) => actions.registerDynamicRoutes(contextMock)

      await wrapper(urlActions)

      expect(contextMock.dispatch).not.toHaveBeenCalledWith('registerMapping', { url, routeData })
    })
    it('should call registerMapping action if dispatchetMap is not empty', async () => {
      const contextMock = {
        state: {
          dispatcherMap: {
            url: 'https://www.example.com'
          }
        },
        dispatch: jest.fn()
      }
      routeData = contextMock.state.dispatcherMap.url;
      url = 'url';

      const wrapper = (actions: any) => actions.registerDynamicRoutes(contextMock)

      await wrapper(urlActions)

      expect(contextMock.dispatch).toHaveBeenCalledWith('registerMapping', { url, routeData })
    })
  })
})
