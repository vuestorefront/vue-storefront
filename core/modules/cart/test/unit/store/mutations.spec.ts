import * as types from '../../../store/mutation-types'
import cartMutations from '../../../store/mutations'
import EventBus from '@vue-storefront/core/compatibility/plugins/event-bus'
jest.mock('@vue-storefront/core/helpers', () => ({
  once: (str) => jest.fn()
}))

EventBus.$emit = jest.fn()

jest.mock('@vue-storefront/core/store', () => ({
  state: {
    config: {}
  }
}))

describe('Cart mutations', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('CART_ADD_ITEM', () => {
    it('adds a product to cart if none of its sku is there yet', () => {
      const stateMock = {
        cartItems: []
      }
      const product = {
        qty: 123,
        sku: 'foo'
      }
      const expectedState = {
        cartItems: [
          {
            qty: 123,
            sku: 'foo'
          }
        ]
      }
      const wrapper = (mutations: any) => mutations[types.CART_ADD_ITEM](stateMock, { product })

      wrapper(cartMutations)

      expect(EventBus.$emit).toBeCalledWith('cart-before-add', { product })
      expect(stateMock).toEqual(expectedState)
    })

    it('adds a product to cart with quantity of 1 if none of its sku is there yet and product qty is not provided', () => {
      const stateMock = {
        cartItems: []
      }
      const product = {
        sku: 'foo'
      }
      const expectedState = {
        cartItems: [
          {
            qty: 1,
            sku: 'foo'
          }
        ]
      }
      const wrapper = (mutations: any) => mutations[types.CART_ADD_ITEM](stateMock, { product })

      wrapper(cartMutations)

      expect(EventBus.$emit).toBeCalledWith('cart-before-add', { product: { ...product, qty: 1 } })
      expect(stateMock).toEqual(expectedState)
    })

    it('increases quantity of a a product in cart if one of its sku is already there', () => {
      const stateMock = {
        cartItems: [
          {
            qty: 10,
            sku: 'foo'
          }
        ]
      }
      const product = {
        qty: 10,
        sku: 'foo'
      }
      const expectedState = {
        cartItems: [
          {
            qty: 20,
            sku: 'foo'
          }
        ]
      }
      const wrapper = (mutations: any) => mutations[types.CART_ADD_ITEM](stateMock, { product })

      wrapper(cartMutations)

      expect(stateMock).toEqual(expectedState)
    })

    it('increases quantity of a a product in cart by 1 if quantity was not provided', () => {
      const stateMock = {
        cartItems: [
          {
            qty: 10,
            sku: 'foo'
          }
        ]
      }
      const product = {
        sku: 'foo'
      }
      const expectedState = {
        cartItems: [
          {
            qty: 11,
            sku: 'foo'
          }
        ]
      }
      const wrapper = (mutations: any) => mutations[types.CART_ADD_ITEM](stateMock, { product })

      wrapper(cartMutations)

      expect(stateMock).toEqual(expectedState)
    })
  })

  describe('CART_DEL_ITEM', () => {
    it('removes product from cart by sku', () => {
      const stateMock = {
        cartItems: [
          {
            qty: 10,
            sku: 'foo'
          }
        ]
      }
      const expectedState = {
        cartItems: []
      }
      const wrapper = (mutations: any) => mutations[types.CART_DEL_ITEM](
        stateMock,
        {
          product: { sku: 'foo' },
          removeByParentSku: false
        }
      )

      wrapper(cartMutations)

      expect(EventBus.$emit).toBeCalledWith('cart-before-delete', {
        items: [{
          qty: 10,
          sku: 'foo'
        }]
      })
      expect(EventBus.$emit).toBeCalledWith('cart-after-delete', { items: expectedState.cartItems })
      expect(stateMock).toEqual(expectedState)
    })

    it('removes product from cart by parent sku', () => {
      const stateMock = {
        cartItems: [
          {
            qty: 10,
            sku: 'foo'
          }
        ]
      }
      const expectedState = {
        cartItems: []
      }
      const wrapper = (mutations: any) => mutations[types.CART_DEL_ITEM](
        stateMock,
        {
          product: { parentSku: 'foo' }
        }
      )

      wrapper(cartMutations)

      expect(EventBus.$emit).toBeCalledWith('cart-before-delete', {
        items: [{
          qty: 10,
          sku: 'foo'
        }]
      })
      expect(EventBus.$emit).toBeCalledWith('cart-after-delete', { items: expectedState.cartItems })
      expect(stateMock).toEqual(expectedState)
    })
  })

  describe('CART_DEL_NON_CONFIRMED_ITEM', () => {
    it('removes product from cart by sku', () => {
      const stateMock = {
        cartItems: [
          {
            qty: 10,
            sku: 'foo'
          }
        ]
      }
      const expectedState = {
        cartItems: [] }
      const wrapper = (mutations: any) => mutations[types.CART_DEL_NON_CONFIRMED_ITEM](
        stateMock,
        {
          product: { sku: 'foo' },
          removeByParentSku: false
        }
      )
      wrapper(cartMutations)

      expect(EventBus.$emit).toBeCalledWith('cart-before-delete', {
        items: [{
          qty: 10,
          sku: 'foo'
        }]
      })
      expect(EventBus.$emit).toBeCalledWith('cart-after-delete', { items: expectedState.cartItems })
      expect(stateMock).toEqual(expectedState)
    })

    it('removes product from cart by parent sku', () => {
      const stateMock = {
        cartItems: [
          {
            qty: 10,
            sku: 'foo'
          }
        ]
      }
      const expectedState = {
        cartItems: []
      }
      const wrapper = (mutations: any) => mutations[types.CART_DEL_NON_CONFIRMED_ITEM](
        stateMock,
        {
          product: { parentSku: 'foo' }
        }
      )

      wrapper(cartMutations)

      expect(EventBus.$emit).toBeCalledWith('cart-before-delete', {
        items: [{
          qty: 10,
          sku: 'foo'
        }]
      })
      expect(EventBus.$emit).toBeCalledWith('cart-after-delete', { items: expectedState.cartItems })
      expect(stateMock).toEqual(expectedState)
    })

    it('does not remove a product that has server_item_id set, so it surely exists in the backend', () => {
      const stateMock = {
        cartItems: [
          {
            qty: 10,
            sku: 'foo',
            server_item_id: 123
          }
        ]
      }
      const expectedState = {
        cartItems: [
          {
            qty: 10,
            sku: 'foo',
            server_item_id: 123
          }
        ]
      }
      const wrapper = (mutations: any) => mutations[types.CART_DEL_NON_CONFIRMED_ITEM](
        stateMock,
        {
          product: { sku: 'foo' },
          removeByParentSku: false
        }
      )

      wrapper(cartMutations)

      expect(EventBus.$emit).toBeCalledWith('cart-before-delete', { items: stateMock.cartItems })
      expect(EventBus.$emit).toBeCalledWith('cart-after-delete', { items: expectedState.cartItems })
      expect(stateMock).toEqual(expectedState)
    })
  })

  describe('CART_UPD_ITEM', () => {
    it('updates product quantity by sku', () => {
      const stateMock = {
        cartItems: [
          {
            sku: 'foo',
            qty: 10
          }
        ]
      }
      const expectedState = {
        cartItems: [
          {
            qty: 20,
            sku: 'foo'
          }
        ]
      }
      const wrapper = (mutations: any) => mutations[types.CART_UPD_ITEM](
        stateMock,
        {
          product: { sku: 'foo' },
          qty: 20
        }
      )
      wrapper(cartMutations)

      // unfortunately before and after events return a reference to the same object, therefore
      // after performing this mutation after event return same object with same, updated value as before event
      expect(EventBus.$emit).toBeCalledWith('cart-before-update', { product: expectedState.cartItems[0] })
      expect(EventBus.$emit).toBeCalledWith('cart-after-update', { product: expectedState.cartItems[0] })
      expect(stateMock).toEqual(expectedState)
    })

    it('doesn\'t update anything if product is not found in cart', () => {
      const stateMock = {
        cartItems: [
          {
            sku: 'foo',
            qty: 10
          }
        ]
      }
      const expectedState = { ...stateMock }
      const wrapper = (mutations: any) => mutations[types.CART_UPD_ITEM](
        stateMock,
        {
          product: { sku: 'qux' },
          qty: 20
        }
      )

      wrapper(cartMutations)

      expect(EventBus.$emit).not.toBeCalled()
      expect(stateMock).toEqual(expectedState)
    })
  })

  describe('CART_UPD_ITEM_PROPS', () => {
    it('updates product properties by sku', () => {
      const stateMock = {
        cartItems: [
          {
            sku: 'foo',
            someProp: 'bar',
            qty: 10
          }
        ]
      }
      const expectedState = {
        cartItems: [
          {
            qty: 20,
            sku: 'foo',
            someProp: 'baz'
          }
        ]
      }
      const wrapper = (mutations: any) => mutations[types.CART_UPD_ITEM_PROPS](
        stateMock,
        {
          product: { sku: 'foo', someProp: 'baz', qty: 20 }
        }
      )
      let firstEmitCall = []

      EventBus.$emit.mockImplementationOnce((eventName, args) => {
        firstEmitCall.push(eventName)
        firstEmitCall.push(args)
      })
      wrapper(cartMutations)

      expect(firstEmitCall).toEqual(['cart-before-itemchanged', { item: expectedState.cartItems[0] }])
      expect(EventBus.$emit).toBeCalledWith('cart-after-itemchanged', { item: expectedState.cartItems[0] })
      expect(stateMock).toEqual(expectedState)
    })

    it('updates product properties by server_item_id', () => {
      const stateMock = {
        cartItems: [
          {
            sku: 'foo',
            server_item_id: 123,
            someProp: 'bar',
            qty: 10
          }
        ]
      }
      const expectedState = {
        cartItems: [
          {
            server_item_id: 123,
            qty: 20,
            sku: 'bar',
            someProp: 'baz'
          }
        ]
      }
      const wrapper = (mutations: any) => mutations[types.CART_UPD_ITEM_PROPS](
        stateMock,
        {
          product: { server_item_id: 123, sku: 'bar', someProp: 'baz', qty: 20 }
        }
      )
      let firstEmitCall = []

      EventBus.$emit.mockImplementationOnce((eventName, args) => {
        firstEmitCall.push(eventName)
        firstEmitCall.push(args)
      })
      wrapper(cartMutations)

      expect(firstEmitCall).toEqual(['cart-before-itemchanged', { item: expectedState.cartItems[0] }])
      expect(EventBus.$emit).toBeCalledWith('cart-after-itemchanged', { item: expectedState.cartItems[0] })
      expect(stateMock).toEqual(expectedState)
    })

    it('doesn\'t update anything if product is not found in cart', () => {
      const stateMock = {
        cartItems: [
          {
            sku: 'foo',
            someProp: 'bar',
            qty: 10
          }
        ]
      }
      const expectedState = { ...stateMock }
      const wrapper = (mutations: any) => mutations[types.CART_UPD_ITEM_PROPS](
        stateMock,
        {
          product: { sku: 'qux', someProp: 'baz', qty: 20 }
        }
      )

      wrapper(cartMutations)

      expect(EventBus.$emit).not.toBeCalled()
      expect(stateMock).toEqual(expectedState)
    })
  })

  it('CART_UPD_SHIPPING sets given shipping method', () => {
    const stateMock = {
      shipping: 'foo'
    }
    const expectedState = {
      shipping: 'bar'
    }
    const wrapper = (mutations: any) => mutations[types.CART_UPD_SHIPPING](
      stateMock,
      expectedState.shipping
    )

    wrapper(cartMutations)

    expect(stateMock).toEqual(expectedState)
  })

  it('CART_LOAD_CART initializes cart with given products', () => {
    const stateMock = {}
    const expectedState = {
      cartItems: [
        {
          sku: 'foo',
          qty: 10
        }
      ],
      cartIsLoaded: true
    }
    const wrapper = (mutations: any) => mutations[types.CART_LOAD_CART](
      stateMock,
      expectedState.cartItems
    )
    wrapper(cartMutations)

    expect(EventBus.$emit).toBeCalledWith('sync/PROCESS_QUEUE', expect.anything())
    expect(EventBus.$emit).toBeCalledWith('application-after-loaded')
    expect(EventBus.$emit).toBeCalledWith('cart-after-loaded')
    expect(stateMock).toEqual(expectedState)
  })

  it('CART_LOAD_CART initializes an empty cart when no products are given', () => {
    const stateMock = {}
    const expectedState = {
      cartItems: [],
      cartIsLoaded: true
    }
    const wrapper = (mutations: any) => mutations[types.CART_LOAD_CART](
      stateMock
    )

    wrapper(cartMutations)

    expect(EventBus.$emit).toBeCalledWith('sync/PROCESS_QUEUE', expect.anything())
    expect(EventBus.$emit).toBeCalledWith('application-after-loaded')
    expect(EventBus.$emit).toBeCalledWith('cart-after-loaded')
    expect(stateMock).toEqual(expectedState)
  })

  it('CART_LOAD_CART_SERVER_TOKEN saves given cart token in cart data', () => {
    const stateMock = {}
    const expectedState = {
      cartServerToken: 'foo'
    }
    const wrapper = (mutations: any) => mutations[types.CART_LOAD_CART_SERVER_TOKEN](
      stateMock,
      expectedState.cartServerToken
    )

    wrapper(cartMutations)

    expect(stateMock).toEqual(expectedState)
  })

  it('CART_UPD_TOTALS updates totals related data', () => {
    const stateMock = {}
    const expectedState = {
      itemsAfterPlatformTotals: ['foo'],
      platformTotals: {
        bar: 1 /** @todo replace with real alike data to show what it can be filled with */
      },
      platformTotalSegments: [
        { 'code': 'subtotal', 'title': 'Subtotal', 'value': 39.36 },
        { 'code': 'grand_total', 'title': 'Grand Total', 'value': 39.36, 'area': 'footer' }
      ]
    }
    const wrapper = (mutations: any) => mutations[types.CART_UPD_TOTALS](
      stateMock,
      {
        itemsAfterTotals: expectedState.itemsAfterPlatformTotals,
        totals: expectedState.platformTotals,
        platformTotalSegments: expectedState.platformTotalSegments
      }
    )

    wrapper(cartMutations)

    expect(EventBus.$emit).toBeCalledWith('cart-after-updatetotals', {
      platformTotals: expectedState.platformTotals,
      platformTotalSegments: expectedState.platformTotalSegments
    })
    expect(stateMock).toEqual(expectedState)
  })

  it('CART_UPD_PAYMENT sets given payment method', () => {
    const stateMock = {
      payment: 'foo'
    }
    const expectedState = {
      payment: 'bar'
    }
    const wrapper = (mutations: any) => mutations[types.CART_UPD_PAYMENT](
      stateMock,
      expectedState.payment
    )

    wrapper(cartMutations)

    expect(stateMock).toEqual(expectedState)
  })

  it('CART_TOGGLE_MICROCART changes microcart open status to the opposite one', () => {
    const stateMock = {
      isMicrocartOpen: true
    }
    const expectedState = {
      isMicrocartOpen: false
    }
    const wrapper = (mutations: any) => mutations[types.CART_TOGGLE_MICROCART](
      stateMock
    )

    wrapper(cartMutations)

    expect(stateMock).toEqual(expectedState)
  })
})
