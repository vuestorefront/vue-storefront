import * as types from '../../store/mutation-types'
import recentlyViewedMutations from '../../store/mutations'

describe('RecentlyViewed mutations', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('RECENTLY_VIEWED_ADD_ITEM', () => {
    it('adds a product to recently viewed if none of its sku is there yet', () => {
      const stateMock = {
        items: []
      }
      const product = {
        qty: 123,
        sku: 'foo'
      }
      const expectedState = {
        items: [
          {
            qty: 123,
            sku: 'foo'
          }
        ]
      }
      const wrapper = (mutations: any) => mutations[types.RECENTLY_VIEWED_ADD_ITEM](stateMock, { product })

      wrapper(recentlyViewedMutations)

      expect(stateMock).toEqual(expectedState)
    })

    it('don\'t adds a product to recently viewed if there is one with the same sku', () => {
      const stateMock = {
        items: [
          {
            qty: 123,
            sku: 'foo'
          }
        ]
      }
      const product = {
        qty: 123,
        sku: 'foo'
      }
      const expectedState = {
        items: [
          {
            qty: 123,
            sku: 'foo'
          }
        ]
      }
      const wrapper = (mutations: any) => mutations[types.RECENTLY_VIEWED_ADD_ITEM](stateMock, { product })

      wrapper(recentlyViewedMutations)

      expect(stateMock).toEqual(expectedState)
    })
  })

  describe('RECENTLY_VIEWED_LOAD', () => {
    it('loads recently viewed items with given products', () => {
      const stateMock = {
        items: []
      }
      const product = {
        qty: 123,
        sku: 'foo'
      }
      const expectedState = {
        items: [
          {
            qty: 123,
            sku: 'foo'
          }
        ]
      }
      const wrapper = (mutations: any) => mutations[types.RECENTLY_VIEWED_LOAD](stateMock, [ product ])

      wrapper(recentlyViewedMutations)

      expect(stateMock).toEqual(expectedState)
    })
  })
})
