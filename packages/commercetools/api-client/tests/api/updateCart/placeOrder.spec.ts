import placeOrder from './../../../src/api/placeOrder'
import createMyOrderFromCart from '../../../src/api/createMyOrderFromCart'
import updateCart from '../../../src/api/updateCart'

const cart = {
  id: 1,
  version: 1
} as any

const address = {
  firstName: 'John',
  lastName: 'Doe',
  country: 'US',
  city: 'New York',
  phone: '123',
  postalCode: '11-111',
  streetName: 'Street 1',
  streetNumber: ''
}

describe('[commercetools-api-client] placeOrder', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('creates an order', async () => {
    const order = {
      shippingDetails: address,
      billingDetails: address,
      shippingMethod: 'dhl'
    } as any

    (createMyOrderFromCart as any).mockImplementation(() => {
      return { data: 'order response' }
    });


    (updateCart as any).mockImplementation((draft) => {
      expect(draft).toEqual({
        ...cart,
        actions: [
          { setShippingAddress: { address } },
          {
            setShippingMethod: {
              shippingMethod: {
                id: 'dhl'
              }
            }
          },
          { setBillingAddress: { address } },
        ]
      })

      return { data: { cart } }
    });

    const response = await placeOrder(cart, order)

    expect(response).toEqual({
      cartResponse: { data: { cart }},
      orderResponse: { data: 'order response' }
    })
  })
});
