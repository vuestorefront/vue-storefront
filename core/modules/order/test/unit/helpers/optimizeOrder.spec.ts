import { Order } from '@vue-storefront/core/modules/order/types/Order'

describe('optimizeOrder method', () => {
  it('should return order without configurable_options and configurable_children', () => {
    const expectedOrder: Order = {
      order_id: 'orderId',
      created_at: '10-29-2019',
      updated_at: '11-29-2019',
      transmited: true,
      transmited_at: '10-29-2019',
      status: 'pending',
      state: 'pending',
      user_id: '15',
      cart_id: '20',
      store_code: '2',
      store_id: 2,
      /**
      * Products list
      */
      products: [
        {
          sku: 'sku1',
          qty: 5,
          name: 'Product 1',
          price: 50,
          product_type: 'Product type 1'
        }
      ],
      addressInformation: {
        shippingAddress: {
          region: 'Region here',
          region_id: 4,
          country_id: '15',
          /**
           * Street name
           */
          street: [],
          company: 'Company here',
          telephone: 'telephone',
          postcode: 'postcode',
          city: 'City name',
          /**
           * First name
           */
          firstname: 'first name',
          lastname: 'last name',
          email: 'example@example.com',
          region_code: '20',
          sameAsBilling: 1
        },
        billingAddress: {
          properties: {}
        },
        shipping_method_code: 'one',
        shipping_carrier_code: 'two',
        payment_method_code: 'three',
        payment_method_additional: 'four'
      }
    };
    const optimizedOrder: Order = {
      order_id: 'orderId',
      created_at: '10-29-2019',
      updated_at: '11-29-2019',
      transmited: true,
      transmited_at: '10-29-2019',
      status: 'pending',
      state: 'pending',
      user_id: '15',
      cart_id: '20',
      store_code: '2',
      store_id: 2,
      products:
        [{
          sku: 'sku1',
          qty: 5,
          name: 'Product 1',
          price: 50,
          product_type: 'Product type 1'
        }],
      addressInformation:
      {
        shippingAddress:
        {
          region: 'Region here',
          region_id: 4,
          country_id: '15',
          street: [],
          company: 'Company here',
          telephone: 'telephone',
          postcode: 'postcode',
          city: 'City name',
          firstname: 'first name',
          lastname: 'last name',
          email: 'example@example.com',
          region_code: '20',
          sameAsBilling: 1
        },
        billingAddress: { properties: {} },
        shipping_method_code: 'one',
        shipping_carrier_code: 'two',
        payment_method_code: 'three',
        payment_method_additional: 'four'
      }
    }

    expect(optimizedOrder).toEqual(expectedOrder)
  })
});
