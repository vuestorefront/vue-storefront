import * as types from '../../store/block/mutation-types';
import blockActions from '../../store/block/actions'

import { quickSearchByQuery } from '@vue-storefront/core/lib/search'

jest.mock('@vue-storefront/i18n', () => ({ t: jest.fn(str => str) }));
jest.mock('@vue-storefront/core/app', () => jest.fn())
jest.mock('@vue-storefront/core/store', () => ({ Module: jest.fn() }))

jest.mock('@vue-storefront/core/types/RootState')
jest.mock('@vue-storefront/core/lib/search')
jest.mock('@vue-storefront/core/modules/cms/helpers', () => ({
  createLoadingBlockQuery: jest.fn(),
  createSingleBlockQuery: jest.fn()
}))

describe('Block actions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('list method', () => {
    it('should update block', async () => {
      const contextMock = {
        commit: jest.fn(),
        getters: { hasItems: false }
      }
      const filter = {};
      const items = ['item1', 'item2', 'item3'];

      (quickSearchByQuery as any).mockResolvedValue({ items });

      const wrapper = (actions: any) => actions.list(contextMock, filter)
      let listAction = await wrapper(blockActions)

      expect(quickSearchByQuery).toHaveBeenCalled()
      expect(contextMock.commit).toBeCalledWith(types.CMS_BLOCK_UPDATE_CMS_BLOCKS, items)
      expect(listAction).toBe(items)
    })

    it('should NOT update blocks if already cached', async () => {
      const contextMock = {
        commit: jest.fn(),
        getters: { hasItems: true, getCmsBlocks: ['item1'] }
      }
      const filter = {};

      const wrapper = (actions: any) => actions.list(contextMock, filter)
      let listAction = await wrapper(blockActions)

      expect(quickSearchByQuery).not.toHaveBeenCalled()
      expect(listAction).toEqual(['item1'])
    })

    it('should NOT update cms_blocks if cache is NOT skipped', async () => {
      const contextMock = {
        commit: jest.fn(),
        getters: { hasItems: true, getCmsBlocks: ['item1'] }
      }
      const filter = { skipCache: false };

      const wrapper = (actions: any) => actions.list(contextMock, filter)
      let listAction = await wrapper(blockActions)

      expect(quickSearchByQuery).not.toHaveBeenCalled()
      expect(listAction).toEqual(['item1'])
    })
  })

  describe('single method', () => {
    it('should add single block if NOT found', async () => {
      const contextMock = {
        commit: jest.fn(),
        getters: { findCmsBlocks: jest.fn(() => []) }
      }
      const filter = {};

      (quickSearchByQuery as any).mockResolvedValue({ items: ['item1', 'item2'] });

      const wrapper = (actions: any) => actions.single(contextMock, filter)
      const singleAction = await wrapper(blockActions)

      expect(contextMock.commit).toBeCalledWith(types.CMS_BLOCK_ADD_CMS_BLOCK, 'item1')
      expect(singleAction).toEqual('item1')
    })

    it('should add single block if cache is NOT skipped', async () => {
      const contextMock = {
        commit: jest.fn(),
        getters: { findCmsBlocks: jest.fn(() => [{ key: 'key1', value: 'val1' }]) }
      }
      const filter = { skipCache: true };

      (quickSearchByQuery as any).mockResolvedValue({ items: ['item1', 'item2'] });

      const wrapper = (actions: any) => actions.single(contextMock, filter)
      const singleAction = await wrapper(blockActions)

      expect(contextMock.commit).toBeCalledWith(types.CMS_BLOCK_ADD_CMS_BLOCK, 'item1')
      expect(singleAction).toEqual('item1')
    })

    it('should ONLY return block if found one', async () => {
      const contextMock = {
        commit: jest.fn(),
        getters: { findCmsBlocks: jest.fn(() => [{ test: 'val1' }]) }
      }
      const filter = { key: 'test', value: 'val1' };

      const wrapper = (actions: any) => actions.single(contextMock, filter)
      const singleAction = await wrapper(blockActions)

      expect(contextMock.commit).not.toBeCalled()
      expect(singleAction).toEqual({ test: 'val1' })
    })
  })

  describe('addItem method', () => {
    it('should add block', async () => {
      const block = { query: {}, entityType: 'cms_block', excludeFields: [], includeFields: [] }
      const contextMock = {
        commit: jest.fn()
      }

      const wrapper = (actions: any) => actions.addItem(contextMock, block)
      await wrapper(blockActions)

      expect(contextMock.commit).toBeCalledWith(types.CMS_BLOCK_ADD_CMS_BLOCK, block)
    })
  })
})
