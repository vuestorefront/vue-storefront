import { Order } from '@vue-storefront/core/modules/order/types/Order'

jest.mock('@vue-storefront/core/lib/multistore', () => ({
  currentStoreView: jest.fn(() => ({
    storeCode: '2'
  }))
}));

describe('prepareOrder method', () => {
  it('should return order', () => {
    const result: Order = {
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
    };
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
    };

    expect(result).toEqual(expectedOrder);
  })
});
