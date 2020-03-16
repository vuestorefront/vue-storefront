import { orderStore } from '../../../store';
import * as types from '../../../store/mutation-types';
import { Order } from '../../../types/Order'

jest.mock('@vue-storefront/i18n', () => ({ t: jest.fn(str => str) }));
jest.mock('@vue-storefront/core/app', () => jest.fn())
jest.mock('@vue-storefront/core/lib/multistore', () => jest.fn())
jest.mock('@vue-storefront/core/lib/storage-manager', () => jest.fn())

describe('Order mutations', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('ORDER_ADD_SESSION_ORDER_HASH', () => {
    it('adds session order hash', () => {
      const stateMock = {
        session_order_hashes: []
      }
      const session_order_hash = 'session-order-hash'
      const expectedState = {
        session_order_hashes: [
          'session-order-hash'
        ]
      }
      const wrapper = (mutations: any) => mutations[types.ORDER_ADD_SESSION_ORDER_HASH](stateMock, session_order_hash)

      wrapper(orderStore.mutations)

      expect(stateMock).toEqual(expectedState)
    })
  })

  describe('ORDER_LAST_ORDER_WITH_CONFIRMATION', () => {
    it('adds last order with confirmation', () => {
      const stateMock = {
        last_order_confirmation: 1,
        session_order_hashes: 2
      }
      const order: Order = {
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
      const wrapper = (mutations: any) => mutations[types.ORDER_LAST_ORDER_WITH_CONFIRMATION](stateMock, order)

      wrapper(orderStore.mutations)

      expect(order).toEqual(expectedOrder)
    })
  });

  describe('ORDER_REMOVE_SESSION_ORDER_HASH', () => {
    it('removes session order hash', () => {
      const stateMock = {
        session_order_hashes: [
          'session-order-hash-one',
          'session-order-hash-two',
          'session-order-hash-three'
        ]
      }
      const session_order_hash_two = 'session-order-hash-two'
      const expectedState = {
        session_order_hashes: [
          'session-order-hash-one',
          'session-order-hash-three'
        ]
      }
      const wrapper = (mutations: any) => mutations[types.ORDER_REMOVE_SESSION_ORDER_HASH](stateMock, session_order_hash_two)

      wrapper(orderStore.mutations)

      expect(stateMock).toEqual(expectedState)
    })
  })
});
