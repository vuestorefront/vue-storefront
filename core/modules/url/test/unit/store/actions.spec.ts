import * as types from '@vue-storefront/core/modules/url/store/mutation-types'
import { cacheStorage } from '@vue-storefront/core/modules/recently-viewed/index'
import { actions as urlActions } from '../../../store/actions'
import { parametrizeRouteData } from '../../../helpers';
import { LocalizedRoute } from '@vue-storefront/core/lib/types'

const SearchQuery = {
  applyFilter: jest.fn()
}

jest.mock('@vue-storefront/core/lib/search/searchQuery', () => () => SearchQuery)
jest.mock('@vue-storefront/i18n', () => ({ t: jest.fn(str => str) }));
jest.mock('@vue-storefront/core/modules/recently-viewed/index', () => ({
  cacheStorage: {
    getItem: jest.fn(),
    setItem: jest.fn(),
    clear: jest.fn()
  }
}));
jest.mock('@vue-storefront/core/lib/multistore', () => ({
  currentStoreView: jest.fn(() => ({
    storeCode: '2',
    localizedRoute: jest.fn(),
    appendStoreCode: '2'
  })),
  localizedDispatcherRouteName: jest.fn(),
  removeStoreCodeFromRoute: jest.fn()
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
  parametrizeRouteData: jest.fn(),
  removeStoreCodeFromRoute: jest.fn()
}));
jest.mock('@vue-storefront/core/lib/storeCodeFromRoute', () => ({
  storeCodeFromRoute: jest.fn()
}))
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

      expect(contextMock.commit).toHaveBeenCalledWith(types.REGISTER_MAPPING, { url, routeData });
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

      expect(contextMock.dispatch).not.toBeCalledWith('registerMapping', { url, routeData })
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

      expect(contextMock.dispatch).toBeCalledWith('registerMapping', { url, routeData })
    })
  })

  /*
  describe('mapUrl action', () => {
    it('should return resolved promise with parametrizedRoute', async () => {
      const contextMock = {
        state: {
          dispatcherMap: {
            url: 'https://www.example.com'
          }
        },
        dispatch: jest.fn()
      }
      const query = 'query';
      const wrapper = (actions: any) => actions.mapUrl(contextMock, {url, query})

      wrapper(urlActions)

      await expect(parametrizeRouteData({fullPath: contextMock.state.dispatcherMap.url}, query, ''))
    })
  })
  */

  /*
  describe('mappingFallBack action', () => {
    it('should return the proper URL from API', async () => {
      const contextMock = {
        dispatch: jest.fn()
      }
      const params = {
        slug: 'slug',
        parentSku: 'sku',
        childSku: 'childSku'
      }
      const expectedResult = {
        name: 'product',
        params: params
      }
      const filter = {
        attribute: 'key',
        value: 'value',
        scope: 'scope',
        options: {}
      }
      const wrapper = (actions: any) => actions.mappingFallback(contextMock, {url, params})

      await wrapper(urlActions)

      expect(contextMock.dispatch).toBeCalledWith('product/list', { query: filter }, { root: true })
    })
  })
  */
})
