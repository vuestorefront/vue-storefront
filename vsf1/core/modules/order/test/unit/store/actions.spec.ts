import * as types from '../../../store/mutation-types';
import orderActions from '../../../store/actions';
import { createContextMock } from '@vue-storefront/unit-tests/utils';
import { notifications } from '../../../helpers';
import { Order } from '../../../types/Order';
import { OrderService } from '@vue-storefront/core/data-resolver'
import config from 'config';

jest.mock('@vue-storefront/i18n', () => ({ t: jest.fn(str => str) }));
jest.mock('@vue-storefront/core/app', () => jest.fn())
jest.mock('@vue-storefront/core/lib/multistore', () => ({
  currentStoreView: jest.fn(() => ({
    storeCode: '2',
    localizedRoute: jest.fn()
  }))
}));
jest.mock('@vue-storefront/core/data-resolver', () => ({
  OrderService: {
    placeOrder: jest.fn()
  }
}));
jest.mock('@vue-storefront/core/lib/logger', () => ({
  Logger: {
    log: jest.fn(() => () => { }),
    debug: jest.fn(() => () => { }),
    warn: jest.fn(() => () => { }),
    error: jest.fn(() => () => { }),
    info: jest.fn(() => () => { })
  }
}));

let order: Order;
let task: any;
let currentOrderHash: string;

describe('Order actions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    order = {
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
          product_type: 'Product type 1',
          configurable_options: [
            {
              'attribute_id': '93',
              'values': [
                {
                  'value_index': 49
                },
                {
                  'value_index': 52
                },
                {
                  'value_index': 56
                }
              ],
              'product_id': 19,
              'id': 3,
              'label': 'Color',
              'position': 0
            },
            {
              'attribute_id': '157',
              'values': [
                {
                  'value_index': 167
                },
                {
                  'value_index': 168
                },
                {
                  'value_index': 169
                },
                {
                  'value_index': 170
                },
                {
                  'value_index': 171
                }
              ],
              'product_id': 19,
              'id': 2,
              'label': 'Size',
              'position': 0
            }
          ],
          configurable_children: [
            {
              'price': 52,
              'name': 'Chaz Kangeroo Hoodie-XS-Black',
              'sku': 'MH01-XS-Black',
              'custom_attributes': [
                {
                  'value': '0',
                  'attribute_code': 'required_options'
                },
                {
                  'value': '0',
                  'attribute_code': 'has_options'
                },
                {
                  'value': '2',
                  'attribute_code': 'tax_class_id'
                },
                {
                  'value': [
                    '15',
                    '36',
                    '2'
                  ],
                  'attribute_code': 'category_ids'
                },
                {
                  'value': '167',
                  'attribute_code': 'size'
                },
                {
                  'value': '49',
                  'attribute_code': 'color'
                },
                {
                  'value': '/m/h/mh01-black_main.jpg',
                  'attribute_code': 'image'
                },
                {
                  'value': '/m/h/mh01-black_main.jpg',
                  'attribute_code': 'small_image'
                },
                {
                  'value': '/m/h/mh01-black_main.jpg',
                  'attribute_code': 'thumbnail'
                },
                {
                  'value': 'chaz-kangeroo-hoodie-xs-black',
                  'attribute_code': 'url_key'
                },
                {
                  'value': '0',
                  'attribute_code': 'msrp_display_actual_price_type'
                }
              ]
            },
            {
              'price': 52,
              'name': 'Chaz Kangeroo Hoodie-XS-Gray',
              'sku': 'MH01-XS-Gray',
              'custom_attributes': [
                {
                  'value': '0',
                  'attribute_code': 'required_options'
                },
                {
                  'value': '0',
                  'attribute_code': 'has_options'
                },
                {
                  'value': '2',
                  'attribute_code': 'tax_class_id'
                },
                {
                  'value': [
                    '15',
                    '36',
                    '2'
                  ],
                  'attribute_code': 'category_ids'
                },
                {
                  'value': '167',
                  'attribute_code': 'size'
                },
                {
                  'value': '52',
                  'attribute_code': 'color'
                },
                {
                  'value': '/m/h/mh01-gray_main.jpg',
                  'attribute_code': 'image'
                },
                {
                  'value': '/m/h/mh01-gray_main.jpg',
                  'attribute_code': 'small_image'
                },
                {
                  'value': '/m/h/mh01-gray_main.jpg',
                  'attribute_code': 'thumbnail'
                },
                {
                  'value': 'chaz-kangeroo-hoodie-xs-gray',
                  'attribute_code': 'url_key'
                },
                {
                  'value': '0',
                  'attribute_code': 'msrp_display_actual_price_type'
                }
              ]
            },
            {
              'price': 52,
              'name': 'Chaz Kangeroo Hoodie-XS-Orange',
              'sku': 'MH01-XS-Orange',
              'custom_attributes': [
                {
                  'value': '0',
                  'attribute_code': 'required_options'
                },
                {
                  'value': '0',
                  'attribute_code': 'has_options'
                },
                {
                  'value': '2',
                  'attribute_code': 'tax_class_id'
                },
                {
                  'value': [
                    '15',
                    '36',
                    '2'
                  ],
                  'attribute_code': 'category_ids'
                },
                {
                  'value': '167',
                  'attribute_code': 'size'
                },
                {
                  'value': '56',
                  'attribute_code': 'color'
                },
                {
                  'value': '/m/h/mh01-orange_main.jpg',
                  'attribute_code': 'image'
                },
                {
                  'value': '/m/h/mh01-orange_main.jpg',
                  'attribute_code': 'small_image'
                },
                {
                  'value': '/m/h/mh01-orange_main.jpg',
                  'attribute_code': 'thumbnail'
                },
                {
                  'value': 'chaz-kangeroo-hoodie-xs-orange',
                  'attribute_code': 'url_key'
                },
                {
                  'value': '0',
                  'attribute_code': 'msrp_display_actual_price_type'
                }
              ]
            },
            {
              'price': 52,
              'name': 'Chaz Kangeroo Hoodie-S-Black',
              'sku': 'MH01-S-Black',
              'custom_attributes': [
                {
                  'value': '0',
                  'attribute_code': 'required_options'
                },
                {
                  'value': '0',
                  'attribute_code': 'has_options'
                },
                {
                  'value': '2',
                  'attribute_code': 'tax_class_id'
                },
                {
                  'value': [
                    '15',
                    '36',
                    '2'
                  ],
                  'attribute_code': 'category_ids'
                },
                {
                  'value': '168',
                  'attribute_code': 'size'
                },
                {
                  'value': '49',
                  'attribute_code': 'color'
                },
                {
                  'value': '/m/h/mh01-black_main.jpg',
                  'attribute_code': 'image'
                },
                {
                  'value': '/m/h/mh01-black_main.jpg',
                  'attribute_code': 'small_image'
                },
                {
                  'value': '/m/h/mh01-black_main.jpg',
                  'attribute_code': 'thumbnail'
                },
                {
                  'value': 'chaz-kangeroo-hoodie-s-black',
                  'attribute_code': 'url_key'
                },
                {
                  'value': '0',
                  'attribute_code': 'msrp_display_actual_price_type'
                }
              ]
            },
            {
              'price': 52,
              'name': 'Chaz Kangeroo Hoodie-S-Gray',
              'sku': 'MH01-S-Gray',
              'custom_attributes': [
                {
                  'value': '0',
                  'attribute_code': 'required_options'
                },
                {
                  'value': '0',
                  'attribute_code': 'has_options'
                },
                {
                  'value': '2',
                  'attribute_code': 'tax_class_id'
                },
                {
                  'value': [
                    '15',
                    '36',
                    '2'
                  ],
                  'attribute_code': 'category_ids'
                },
                {
                  'value': '168',
                  'attribute_code': 'size'
                },
                {
                  'value': '52',
                  'attribute_code': 'color'
                },
                {
                  'value': '/m/h/mh01-gray_main.jpg',
                  'attribute_code': 'image'
                },
                {
                  'value': '/m/h/mh01-gray_main.jpg',
                  'attribute_code': 'small_image'
                },
                {
                  'value': '/m/h/mh01-gray_main.jpg',
                  'attribute_code': 'thumbnail'
                },
                {
                  'value': 'chaz-kangeroo-hoodie-s-gray',
                  'attribute_code': 'url_key'
                },
                {
                  'value': '0',
                  'attribute_code': 'msrp_display_actual_price_type'
                }
              ]
            },
            {
              'price': 52,
              'name': 'Chaz Kangeroo Hoodie-S-Orange',
              'sku': 'MH01-S-Orange',
              'custom_attributes': [
                {
                  'value': '0',
                  'attribute_code': 'required_options'
                },
                {
                  'value': '0',
                  'attribute_code': 'has_options'
                },
                {
                  'value': '2',
                  'attribute_code': 'tax_class_id'
                },
                {
                  'value': [
                    '15',
                    '36',
                    '2'
                  ],
                  'attribute_code': 'category_ids'
                },
                {
                  'value': '168',
                  'attribute_code': 'size'
                },
                {
                  'value': '56',
                  'attribute_code': 'color'
                },
                {
                  'value': '/m/h/mh01-orange_main.jpg',
                  'attribute_code': 'image'
                },
                {
                  'value': '/m/h/mh01-orange_main.jpg',
                  'attribute_code': 'small_image'
                },
                {
                  'value': '/m/h/mh01-orange_main.jpg',
                  'attribute_code': 'thumbnail'
                },
                {
                  'value': 'chaz-kangeroo-hoodie-s-orange',
                  'attribute_code': 'url_key'
                },
                {
                  'value': '0',
                  'attribute_code': 'msrp_display_actual_price_type'
                }
              ]
            },
            {
              'price': 52,
              'name': 'Chaz Kangeroo Hoodie-M-Black',
              'sku': 'MH01-M-Black',
              'custom_attributes': [
                {
                  'value': '0',
                  'attribute_code': 'required_options'
                },
                {
                  'value': '0',
                  'attribute_code': 'has_options'
                },
                {
                  'value': '2',
                  'attribute_code': 'tax_class_id'
                },
                {
                  'value': [
                    '15',
                    '36',
                    '2'
                  ],
                  'attribute_code': 'category_ids'
                },
                {
                  'value': '169',
                  'attribute_code': 'size'
                },
                {
                  'value': '49',
                  'attribute_code': 'color'
                },
                {
                  'value': '/m/h/mh01-black_main.jpg',
                  'attribute_code': 'image'
                },
                {
                  'value': '/m/h/mh01-black_main.jpg',
                  'attribute_code': 'small_image'
                },
                {
                  'value': '/m/h/mh01-black_main.jpg',
                  'attribute_code': 'thumbnail'
                },
                {
                  'value': 'chaz-kangeroo-hoodie-m-black',
                  'attribute_code': 'url_key'
                },
                {
                  'value': '0',
                  'attribute_code': 'msrp_display_actual_price_type'
                }
              ]
            },
            {
              'price': 52,
              'name': 'Chaz Kangeroo Hoodie-M-Gray',
              'sku': 'MH01-M-Gray',
              'custom_attributes': [
                {
                  'value': '0',
                  'attribute_code': 'required_options'
                },
                {
                  'value': '0',
                  'attribute_code': 'has_options'
                },
                {
                  'value': '2',
                  'attribute_code': 'tax_class_id'
                },
                {
                  'value': [
                    '15',
                    '36',
                    '2'
                  ],
                  'attribute_code': 'category_ids'
                },
                {
                  'value': '169',
                  'attribute_code': 'size'
                },
                {
                  'value': '52',
                  'attribute_code': 'color'
                },
                {
                  'value': '/m/h/mh01-gray_main.jpg',
                  'attribute_code': 'image'
                },
                {
                  'value': '/m/h/mh01-gray_main.jpg',
                  'attribute_code': 'small_image'
                },
                {
                  'value': '/m/h/mh01-gray_main.jpg',
                  'attribute_code': 'thumbnail'
                },
                {
                  'value': 'chaz-kangeroo-hoodie-m-gray',
                  'attribute_code': 'url_key'
                },
                {
                  'value': '0',
                  'attribute_code': 'msrp_display_actual_price_type'
                }
              ]
            },
            {
              'price': 52,
              'name': 'Chaz Kangeroo Hoodie-M-Orange',
              'sku': 'MH01-M-Orange',
              'custom_attributes': [
                {
                  'value': '0',
                  'attribute_code': 'required_options'
                },
                {
                  'value': '0',
                  'attribute_code': 'has_options'
                },
                {
                  'value': '2',
                  'attribute_code': 'tax_class_id'
                },
                {
                  'value': [
                    '15',
                    '36',
                    '2'
                  ],
                  'attribute_code': 'category_ids'
                },
                {
                  'value': '169',
                  'attribute_code': 'size'
                },
                {
                  'value': '56',
                  'attribute_code': 'color'
                },
                {
                  'value': '/m/h/mh01-orange_main.jpg',
                  'attribute_code': 'image'
                },
                {
                  'value': '/m/h/mh01-orange_main.jpg',
                  'attribute_code': 'small_image'
                },
                {
                  'value': '/m/h/mh01-orange_main.jpg',
                  'attribute_code': 'thumbnail'
                },
                {
                  'value': 'chaz-kangeroo-hoodie-m-orange',
                  'attribute_code': 'url_key'
                },
                {
                  'value': '0',
                  'attribute_code': 'msrp_display_actual_price_type'
                }
              ]
            },
            {
              'price': 52,
              'name': 'Chaz Kangeroo Hoodie-L-Black',
              'sku': 'MH01-L-Black',
              'custom_attributes': [
                {
                  'value': '0',
                  'attribute_code': 'required_options'
                },
                {
                  'value': '0',
                  'attribute_code': 'has_options'
                },
                {
                  'value': '2',
                  'attribute_code': 'tax_class_id'
                },
                {
                  'value': [
                    '15',
                    '36',
                    '2'
                  ],
                  'attribute_code': 'category_ids'
                },
                {
                  'value': '170',
                  'attribute_code': 'size'
                },
                {
                  'value': '49',
                  'attribute_code': 'color'
                },
                {
                  'value': '/m/h/mh01-black_main.jpg',
                  'attribute_code': 'image'
                },
                {
                  'value': '/m/h/mh01-black_main.jpg',
                  'attribute_code': 'small_image'
                },
                {
                  'value': '/m/h/mh01-black_main.jpg',
                  'attribute_code': 'thumbnail'
                },
                {
                  'value': 'chaz-kangeroo-hoodie-l-black',
                  'attribute_code': 'url_key'
                },
                {
                  'value': '0',
                  'attribute_code': 'msrp_display_actual_price_type'
                }
              ]
            },
            {
              'price': 52,
              'name': 'Chaz Kangeroo Hoodie-L-Gray',
              'sku': 'MH01-L-Gray',
              'custom_attributes': [
                {
                  'value': '0',
                  'attribute_code': 'required_options'
                },
                {
                  'value': '0',
                  'attribute_code': 'has_options'
                },
                {
                  'value': '2',
                  'attribute_code': 'tax_class_id'
                },
                {
                  'value': [
                    '15',
                    '36',
                    '2'
                  ],
                  'attribute_code': 'category_ids'
                },
                {
                  'value': '170',
                  'attribute_code': 'size'
                },
                {
                  'value': '52',
                  'attribute_code': 'color'
                },
                {
                  'value': '/m/h/mh01-gray_main.jpg',
                  'attribute_code': 'image'
                },
                {
                  'value': '/m/h/mh01-gray_main.jpg',
                  'attribute_code': 'small_image'
                },
                {
                  'value': '/m/h/mh01-gray_main.jpg',
                  'attribute_code': 'thumbnail'
                },
                {
                  'value': 'chaz-kangeroo-hoodie-l-gray',
                  'attribute_code': 'url_key'
                },
                {
                  'value': '0',
                  'attribute_code': 'msrp_display_actual_price_type'
                }
              ]
            },
            {
              'price': 52,
              'name': 'Chaz Kangeroo Hoodie-L-Orange',
              'sku': 'MH01-L-Orange',
              'custom_attributes': [
                {
                  'value': '0',
                  'attribute_code': 'required_options'
                },
                {
                  'value': '0',
                  'attribute_code': 'has_options'
                },
                {
                  'value': '2',
                  'attribute_code': 'tax_class_id'
                },
                {
                  'value': [
                    '15',
                    '36',
                    '2'
                  ],
                  'attribute_code': 'category_ids'
                },
                {
                  'value': '170',
                  'attribute_code': 'size'
                },
                {
                  'value': '56',
                  'attribute_code': 'color'
                },
                {
                  'value': '/m/h/mh01-orange_main.jpg',
                  'attribute_code': 'image'
                },
                {
                  'value': '/m/h/mh01-orange_main.jpg',
                  'attribute_code': 'small_image'
                },
                {
                  'value': '/m/h/mh01-orange_main.jpg',
                  'attribute_code': 'thumbnail'
                },
                {
                  'value': 'chaz-kangeroo-hoodie-l-orange',
                  'attribute_code': 'url_key'
                },
                {
                  'value': '0',
                  'attribute_code': 'msrp_display_actual_price_type'
                }
              ]
            },
            {
              'price': 52,
              'name': 'Chaz Kangeroo Hoodie-XL-Black',
              'sku': 'MH01-XL-Black',
              'custom_attributes': [
                {
                  'value': '0',
                  'attribute_code': 'required_options'
                },
                {
                  'value': '0',
                  'attribute_code': 'has_options'
                },
                {
                  'value': '2',
                  'attribute_code': 'tax_class_id'
                },
                {
                  'value': [
                    '15',
                    '36',
                    '2'
                  ],
                  'attribute_code': 'category_ids'
                },
                {
                  'value': '171',
                  'attribute_code': 'size'
                },
                {
                  'value': '49',
                  'attribute_code': 'color'
                },
                {
                  'value': '/m/h/mh01-black_main.jpg',
                  'attribute_code': 'image'
                },
                {
                  'value': '/m/h/mh01-black_main.jpg',
                  'attribute_code': 'small_image'
                },
                {
                  'value': '/m/h/mh01-black_main.jpg',
                  'attribute_code': 'thumbnail'
                },
                {
                  'value': 'chaz-kangeroo-hoodie-xl-black',
                  'attribute_code': 'url_key'
                },
                {
                  'value': '0',
                  'attribute_code': 'msrp_display_actual_price_type'
                }
              ]
            },
            {
              'price': 52,
              'name': 'Chaz Kangeroo Hoodie-XL-Gray',
              'sku': 'MH01-XL-Gray',
              'custom_attributes': [
                {
                  'value': '0',
                  'attribute_code': 'required_options'
                },
                {
                  'value': '0',
                  'attribute_code': 'has_options'
                },
                {
                  'value': '2',
                  'attribute_code': 'tax_class_id'
                },
                {
                  'value': [
                    '15',
                    '36',
                    '2'
                  ],
                  'attribute_code': 'category_ids'
                },
                {
                  'value': '171',
                  'attribute_code': 'size'
                },
                {
                  'value': '52',
                  'attribute_code': 'color'
                },
                {
                  'value': '/m/h/mh01-gray_main.jpg',
                  'attribute_code': 'image'
                },
                {
                  'value': '/m/h/mh01-gray_main.jpg',
                  'attribute_code': 'small_image'
                },
                {
                  'value': '/m/h/mh01-gray_main.jpg',
                  'attribute_code': 'thumbnail'
                },
                {
                  'value': 'chaz-kangeroo-hoodie-xl-gray',
                  'attribute_code': 'url_key'
                },
                {
                  'value': '0',
                  'attribute_code': 'msrp_display_actual_price_type'
                }
              ]
            },
            {
              'price': 52,
              'name': 'Chaz Kangeroo Hoodie-XL-Orange',
              'sku': 'MH01-XL-Orange',
              'custom_attributes': [
                {
                  'value': '0',
                  'attribute_code': 'required_options'
                },
                {
                  'value': '0',
                  'attribute_code': 'has_options'
                },
                {
                  'value': '2',
                  'attribute_code': 'tax_class_id'
                },
                {
                  'value': [
                    '15',
                    '36',
                    '2'
                  ],
                  'attribute_code': 'category_ids'
                },
                {
                  'value': '171',
                  'attribute_code': 'size'
                },
                {
                  'value': '56',
                  'attribute_code': 'color'
                },
                {
                  'value': '/m/h/mh01-orange_main.jpg',
                  'attribute_code': 'image'
                },
                {
                  'value': '/m/h/mh01-orange_main.jpg',
                  'attribute_code': 'small_image'
                },
                {
                  'value': '/m/h/mh01-orange_main.jpg',
                  'attribute_code': 'thumbnail'
                },
                {
                  'value': 'chaz-kangeroo-hoodie-xl-orange',
                  'attribute_code': 'url_key'
                },
                {
                  'value': '0',
                  'attribute_code': 'msrp_display_actual_price_type'
                }
              ]
            }
          ]
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
          properties: {
          }
        },
        shipping_method_code: 'one',
        shipping_carrier_code: 'two',
        payment_method_code: 'three',
        payment_method_additional: 'four'
      }
    }
    task = { resultCode: 200, result: 'server-order-token' }
    currentOrderHash = '4884598394f87665bceddb7585d5d7c5b08b6e0eb6a3ebaf6710fc48'
  });

  describe('placeOrder action', () => {
    it('should not add session stamps if it is alrady processed', async () => {
      const contextMock = {
        commit: jest.fn(),
        dispatch: jest.fn(),
        getters: { getSessionOrderHashes: 'current-order-hash' }
      };

      await (orderActions as any).placeOrder(contextMock, order);

      expect(contextMock.commit).not.toBeCalledWith(types.ORDER_ADD_SESSION_STAMPS);
    })

    it('should dispatch processOrder', async () => {
      const contextMock = createContextMock({
        getters: { getSessionOrderHashes: 'current-order-hash' }
      });
      const newOrder: Order = {
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

      config.orders = {
        directBackendSync: false
      }

      await (orderActions as any).placeOrder(contextMock, order)

      expect(contextMock.dispatch).toBeCalledWith('processOrder', { newOrder: newOrder, currentOrderHash })
    })

    it('should dispatch processOrder', async () => {
      (OrderService.placeOrder as jest.Mock).mockImplementation(async () =>
        (task)
      );
      const newOrder: Order = {
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
      const contextMock = createContextMock({
        getters: { getSessionOrderHashes: 'current-order-hash' }
      });
      config.orders = {
        directBackendSync: true
      }

      await (orderActions as any).placeOrder(contextMock, order)

      expect(contextMock.commit).toBeCalledWith(types.ORDER_ADD_SESSION_STAMPS, order);
      expect(contextMock.dispatch).toBeCalledWith('processOrder', { newOrder: newOrder, currentOrderHash })
    })
  });
  describe('processOrder action', () => {
    it('should add last order with confirmation', async () => {
      (OrderService.placeOrder as jest.Mock).mockImplementation(async () =>
        (task)
      );
      const contextMock = createContextMock();
      const order = { 'transmited': true }
      const order1 = {
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
      const wrapper = (actions: any) => actions.processOrder(contextMock, { order1, currentOrderHash })
      const processOrderAction = await wrapper(orderActions);

      expect(contextMock.commit).toBeCalledWith(types.ORDER_LAST_ORDER_WITH_CONFIRMATION, { order, confirmation: task.result })
      expect(processOrderAction).toEqual(task)
    })

    it('should remove session order hash', async () => {
      task = { resultCode: 400, result: 'server-order-token' };
      (OrderService.placeOrder as jest.Mock).mockImplementation(async () =>
        (task)
      );
      const contextMock = createContextMock();
      const wrapper = (actions: any) => actions.processOrder(contextMock, { order, currentOrderHash })
      const processOrderAction = await wrapper(orderActions);

      expect(contextMock.commit).toBeCalledWith(types.ORDER_REMOVE_SESSION_ORDER_HASH, currentOrderHash);
      expect(processOrderAction).toEqual(task)
    })
  });

  describe('handlePlacingOrderFailed action', () => {
    it('should dispatch enqueue action', () => {
      const contextMock = createContextMock();
      const newOrder: Order = {
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
      const expectedOrder = { newOrder, transmited: false }

      const wrapper = (orderActions: any) => orderActions.handlePlacingOrderFailed(contextMock, { newOrder, currentOrderHash });

      wrapper(orderActions);

      expect(contextMock.dispatch).toBeCalledWith('enqueueOrder', { newOrder: expectedOrder })
    })
  })
});
