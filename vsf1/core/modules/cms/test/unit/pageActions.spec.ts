import * as types from '../../store/page/mutation-types';
import pageActions from '../../store/page/actions'

import { StorageManager } from '@vue-storefront/core/lib/storage-manager';
import { quickSearchByQuery } from '@vue-storefront/core/lib/search'

jest.mock('@vue-storefront/i18n', () => ({ t: jest.fn(str => str) }));
jest.mock('@vue-storefront/core/app', () => jest.fn())
jest.mock('@vue-storefront/core/store', () => ({ Module: jest.fn() }))

jest.mock('@vue-storefront/core/types/RootState')
jest.mock('@vue-storefront/core/lib/search')
jest.mock('@vue-storefront/core/lib/storage-manager')
jest.mock('@vue-storefront/core/modules/cms/helpers', () => ({
  createSinglePageLoadQuery: jest.fn(),
  createPageLoadingQuery: jest.fn()
}))

describe('Page actions', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('list method', () => {
    it('should update pages and list them', async () => {
      const filter = {}
      const items = ['item1, item2, item3']
      const contextMock = {
        commit: jest.fn()
      };

      (quickSearchByQuery as any).mockResolvedValue({ items: items })

      const wrapper = (actions: any) => actions.list(contextMock, filter)
      const listAction = await wrapper(pageActions)

      expect(contextMock.commit).toBeCalledWith(types.CMS_PAGE_UPDATE_CMS_PAGES, items)
      expect(listAction).toEqual(items)
    })
  })

  describe('single method', () => {
    it('should add page if cache is skipped', async () => {
      const filter = { skipCache: true, setCurrent: false }
      const contextMock = {
        getters: {
          findItems: () => 'item1',
          hasItems: true
        },
        commit: jest.fn(),
        dispatch: jest.fn()
      };

      (quickSearchByQuery as any).mockResolvedValue({ items: ['item1'] })

      const wrapper = (actions: any) => actions.single(contextMock, filter)
      const singleAction = await wrapper(pageActions)

      expect(contextMock.commit).toBeCalledWith(types.CMS_PAGE_ADD_CMS_PAGE, 'item1')
      expect(singleAction).toEqual('item1')
    })

    it('should add page if cache is skipped and set as current', async () => {
      const filter = { skipCache: true, setCurrent: true }
      const contextMock = {
        getters: {
          findItems: () => 'item1',
          hasItems: true
        },
        commit: jest.fn(),
        dispatch: jest.fn()
      };

      (quickSearchByQuery as any).mockResolvedValue({ items: ['item1'] })

      const wrapper = (actions: any) => actions.single(contextMock, filter)
      const singleAction = await wrapper(pageActions)

      expect(contextMock.commit).toBeCalledWith(types.CMS_PAGE_ADD_CMS_PAGE, 'item1')
      expect(contextMock.commit).toBeCalledWith(types.CMS_PAGE_SET_CURRENT, 'item1')
      expect(singleAction).toEqual('item1')
    })

    it('should add page if does NOT have items', async () => {
      const filter = {}
      const contextMock = {
        getters: {
          findItems: () => 'item1',
          hasItems: false
        },
        commit: jest.fn(),
        dispatch: jest.fn()
      };

      (quickSearchByQuery as any).mockResolvedValue({ items: ['item1'] })

      const wrapper = (actions: any) => actions.single(contextMock, filter)
      const singleAction = await wrapper(pageActions)

      expect(contextMock.commit).toBeCalledWith(types.CMS_PAGE_ADD_CMS_PAGE, 'item1')
      expect(singleAction).toEqual('item1')
    })

    it('should add page if does NOT have current items', async () => {
      const filter = {}
      const contextMock = {
        getters: {
          findItems: () => undefined,
          hasItems: false
        },
        commit: jest.fn(),
        dispatch: jest.fn()
      };

      (quickSearchByQuery as any).mockResolvedValue({ items: ['item1'] })

      const wrapper = (actions: any) => actions.single(contextMock, filter)
      const singleAction = await wrapper(pageActions)

      expect(contextMock.commit).toBeCalledWith(types.CMS_PAGE_ADD_CMS_PAGE, 'item1')
      expect(singleAction).toEqual('item1')
    })

    it('should throw error if query returned empty value', async () => {
      const filter = {}
      const contextMock = {
        getters: {
          findItems: () => undefined,
          hasItems: false
        },
        commit: jest.fn(),
        dispatch: jest.fn()
      };

      (quickSearchByQuery as any).mockResolvedValue({ items: ['item1'] })

      const wrapper = (actions: any) => actions.single(contextMock, filter)
      try {
        await wrapper(pageActions)
      } catch (e) {
        expect(e.message).toBe('CMS query returned empty result')
      }
    })

    it('should NOT add new page but set current one', async () => {
      const filter = {}
      const contextMock = {
        getters: {
          findItems: () => 'item1',
          hasItems: false
        },
        commit: jest.fn(),
        dispatch: jest.fn()
      };

      const wrapper = (actions: any) => actions.single(contextMock, filter)
      const singleAction = await wrapper(pageActions)

      expect(contextMock.commit).toBeCalledWith(types.CMS_PAGE_SET_CURRENT, 'item1')
      expect(singleAction).toEqual('item1')
    })
  })

  describe('loadFromCache action', () => {
    beforeEach(() => {
      jest.clearAllMocks()
    })

    it('should return cached response and set the page as current', async () => {
      const filter = { key: 'test', value: 'value', setCurrent: true }
      const contextMock = { commit: jest.fn() }
      const wrapper = (actions: any) => actions.loadFromCache(contextMock, filter);
      (StorageManager as any).get.mockImplementationOnce((...args) => {
        return {
          getItem: (...args) => Promise.resolve([{ test: 'value' }])
        }
      })

      const loadFromCacheAction = await wrapper(pageActions)

      expect(contextMock.commit).toHaveBeenCalledWith(types.CMS_PAGE_SET_CURRENT, { test: 'value' })
      expect(loadFromCacheAction).toEqual({ test: 'value' })
    })

    it('should return cached response and NOT set the page as current', async () => {
      const filter = { key: 'test', value: 'value', setCurrent: false }
      const contextMock = { commit: jest.fn() }
      const wrapper = (actions: any) => actions.loadFromCache(contextMock, filter);
      (StorageManager as any).get.mockImplementationOnce((...args) => {
        return {
          getItem: (...args: any) => Promise.resolve([{ test: 'value' }])
        }
      })

      const loadFromCacheAction = await wrapper(pageActions)

      expect(contextMock.commit).not.toHaveBeenCalledWith(types.CMS_PAGE_SET_CURRENT, { test: 'value' })
      expect(loadFromCacheAction).toEqual({ test: 'value' })
    })

    it('should throw error when storedItems are empty', async () => {
      const filter = { key: 'test', value: 'value', setCurrent: false }
      const contextMock = { commit: jest.fn() }
      const wrapper = (actions: any) => actions.loadFromCache(contextMock, filter);
      (StorageManager as any).get.mockImplementationOnce((...args: any) => {
        return ({ getItem: (...args: any) => Promise.resolve(undefined) })
      })

      try {
        await wrapper(pageActions)
      } catch (e) {
        expect(e.message).toBe('CMS query returned empty result')
      }
    })
  })

  describe('loadFromCache action', () => {
    it('should throw error when cannot find given element in stored items', async () => {
      const filter = { key: 'test', value: 'value', setCurrent: false }
      const contextMock = { commit: jest.fn() }
      const wrapper = (actions: any) => actions.loadFromCache(contextMock, filter);
      (StorageManager as any).get.mockImplementationOnce((...args: any) => {
        return ({ getItem: (...args: any) => Promise.resolve([]) })
      })

      try {
        await wrapper(pageActions)
      } catch (e) {
        expect(contextMock.commit).toBeCalledWith(types.CMS_PAGE_UPDATE_CMS_PAGES, [])
        expect(e.message).toBe('CMS query returned empty result')
      }
    })
  })

  describe('addItem method', () => {
    it('should add new page', async () => {
      const page = 'page_name'
      const contextMock = {
        commit: jest.fn()
      }
      const wrapper = (actions: any) => actions.addItem(contextMock, page)
      await wrapper(pageActions)

      expect(contextMock.commit).toBeCalledWith(types.CMS_PAGE_ADD_CMS_PAGE, page)
    })
  })
})
