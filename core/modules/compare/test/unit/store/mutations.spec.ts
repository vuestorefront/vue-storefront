import * as types from '../../../store/mutation-types';
import compareMutations from '../../../store/mutations'

describe('Compare mutations', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('COMPARE_ADD_ITEM', () => {
    it('add product to compare', () => {
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
      const wrapper = (mutations: any) => mutations[types.COMPARE_ADD_ITEM](stateMock, { product })

      wrapper(compareMutations)

      expect(stateMock).toEqual(expectedState)
    })

    it('don\'t add product if there is one with the same sku', () => {
      const stateMock = {
        items: [
          {
            qty: 1233,
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
            qty: 1233,
            sku: 'foo'
          }
        ]
      }
      const wrapper = (mutations: any) => mutations[types.COMPARE_ADD_ITEM](stateMock, { product })

      wrapper(compareMutations)

      expect(stateMock).toEqual(expectedState)
    })
  });

  describe('COMPARE_DEL_ITEM', () => {
    it('remove product if there is one with the same sku', () => {
      const stateMock = {
        items: [
          {
            qty: 1233,
            sku: 'foo'
          }
        ]
      }
      const product = {
        qty: 123,
        sku: 'foo'
      }
      const expectedState = {
        items: []
      }
      const wrapper = (mutations: any) => mutations[types.COMPARE_DEL_ITEM](stateMock, { product })

      wrapper(compareMutations)

      expect(stateMock).toEqual(expectedState)
    })

    it('don\'t remove product if there is not any with same sku', () => {
      const stateMock = {
        items: [
          {
            qty: 1233,
            sku: 'boo'
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
            qty: 1233,
            sku: 'boo'
          }
        ]
      }
      const wrapper = (mutations: any) => mutations[types.COMPARE_DEL_ITEM](stateMock, { product })

      wrapper(compareMutations)

      expect(stateMock).toEqual(expectedState)
    })
  });

  describe('COMPARE_LOAD_COMPARE', () => {
    it('should load state with products to compare', () => {
      const stateMock = {
        items: []
      }
      const product = {
        qty: 123,
        sku: 'foo'
      }
      const expectedState = {
        items: [product, product]
      }
      const wrapper = (mutations: any) => mutations[types.COMPARE_LOAD_COMPARE](stateMock, [product, product])

      wrapper(compareMutations)

      expect(stateMock).toEqual(expectedState)
    })
  });

  describe('SET_COMPARE_LOADED', () => {
    it('should set state as loaded', () => {
      const stateMock = {
        loaded: false
      }
      const expectedState = {
        loaded: true
      }
      const wrapper = (mutations: any) => mutations[types.SET_COMPARE_LOADED](stateMock)

      wrapper(compareMutations)

      expect(stateMock).toEqual(expectedState)
    })

    it('should set state as not loaded', () => {
      const stateMock = {
        loaded: true
      }
      const expectedState = {
        loaded: false
      }
      const wrapper = (mutations: any) => mutations[types.SET_COMPARE_LOADED](stateMock, false)

      wrapper(compareMutations)

      expect(stateMock).toEqual(expectedState)
    })
  });
});
