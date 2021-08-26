import * as types from '../../store/block/mutation-types'
import blockMutations from '../../store/block/mutations'

jest.mock('@vue-storefront/core/app', () => jest.fn())

describe('Block mutations', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should update cms blocks', () => {
    const cmsBlock = ['item1', 'item2', 'item3']
    const stateMock = { items: [] }
    const expectedState = {
      items: ['item1', 'item2', 'item3']
    }

    const wrapper = (mutations: any) => mutations[types.CMS_BLOCK_UPDATE_CMS_BLOCKS](stateMock, cmsBlock)
    wrapper(blockMutations)

    expect(stateMock).toEqual(expectedState)
  })

  it('should clear cms blocks after update without args', () => {
    const cmsBlock = ['item1', 'item2', 'item3']
    const stateMock = { items: [] }
    const expectedState = {
      items: []
    }

    const wrapper = (mutations: any) => mutations[types.CMS_BLOCK_UPDATE_CMS_BLOCKS](stateMock, false)
    wrapper(blockMutations)

    expect(stateMock).toEqual(expectedState)
  })

  it('should add new item if item with the same id does NOT exist', () => {
    const cmsBlock = { id: 2, data: 'item-id2-data' }
    const stateMock = { items: [{ id: 1, data: 'item-id1-data' }] }
    const expectedState = {
      items: [{ id: 1, data: 'item-id1-data' }, { id: 2, data: 'item-id2-data' }]
    }

    const wrapper = (mutations: any) => mutations[types.CMS_BLOCK_ADD_CMS_BLOCK](stateMock, cmsBlock)
    wrapper(blockMutations)
    expect(stateMock).toEqual(expectedState)
  })

  it('should NOT add new item if item with the same id exists', () => {
    const cmsBlock = { id: 1, data: 'item-id1-new-data' }
    const stateMock = {
      items: [{ id: 1, data: 'item-id1-data' }]
    }
    const expectedState = {
      items: [{ id: 1, data: 'item-id1-data' }]
    }

    const wrapper = (mutations: any) => mutations[types.CMS_BLOCK_ADD_CMS_BLOCK](stateMock, cmsBlock)
    wrapper(blockMutations)
    expect(stateMock).toEqual(expectedState)
  })
})
