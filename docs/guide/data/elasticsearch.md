# ElasticSearch data formats

The service is using the Elasticsearch data format compliant with ElasticSuite for Magento 1.x/2.x from [Smile](https://github.com/Smile-SA/smile-magento-elasticsearch).

## Product type

The product data format is a combined form of the following Magento2 REST API calls:

- [catalogProductRepositoryV1GetListGet](http://devdocs.magento.com/swagger/#!/catalogProductRepositoryV1/catalogProductRepositoryV1GetListGet)
- [catalogInventoryStockRegistryV1GetStockItemBySkuGet](http://devdocs.magento.com/swagger/#!/catalogInventoryStockRegistryV1/catalogInventoryStockRegistryV1GetStockItemBySkuGet)
- [configurableProductLinkManagementV1GetChildrenGet](http://devdocs.magento.com/swagger/#!/configurableProductLinkManagementV1/configurableProductLinkManagementV1GetChildrenGet)
- [configurableProductOptionRepositoryV1GetListGet](http://devdocs.magento.com/swagger/#!/configurableProductOptionRepositoryV1/configurableProductOptionRepositoryV1GetListGet)

```json
    {
        "_index": "storefront_catalog",
        "_type": "product",
        "_id": 19,
        "_score": 1,
        "_source": {
          "id": 19,
          "sku": "24-UG05",
          "name": "Go-Get'r Pushup Grips",
          "attribute_set_id": 11,
          "price": 19,
          "status": 1,
          "visibility": 4,
          "type_id": "simple",
          "created_at": "2017-10-31 00:07:05",
          "updated_at": "2017-10-31 00:07:05",
          "extension_attributes": [],
          "product_links": [],
          "tier_prices": [],
          "custom_attributes": null,
          "category": [
            {
              "category_id": 2,
              "name": "Default Category"
            },
            {
              "category_id": 3,
              "name": "Gear"
            },
            {
              "category_id": 5,
              "name": "Fitness Equipment"
            },
            {
              "category_id": 7,
              "name": "Collections"
            },
            {
              "category_id": 8,
              "name": "New Luma Yoga Collection"
            }
          ],
          "description": "<p>The Go-Get'r Pushup Grips safely provide the extra range of motion you need for a deep-dip routine targeting core, shoulder, chest and arm strength. Do fewer pushups using more energy, getting better results faster than the standard floor-level technique yield.</p>\n<ul>\n<li>Durable foam grips.</li>\n<li>Supportive base.</li>\n</ul>",
          "image": "/u/g/ug05-gr-0.jpg",
          "small_image": "/u/g/ug05-gr-0.jpg",
          "thumbnail": "/u/g/ug05-gr-0.jpg",
          "options_container": "container2",
          "required_options": 0,
          "has_options": 0,
          "url_key": "go-get-r-pushup-grips",
          "tax_class_id": 2,
          "activity": "16,11",
          "material": "44,45",
          "gender": "80,81,84",
          "category_gear": "87",
          "erin_recommends": "1",
          "new": "1",
          "pattern": "195",
          "eco_collection": "1",
          "msrp_display_actual_price_type": 0,
          "climate": "202,204,205,208,210",
          "performance_fabric": "0",
          "sale": "1",
          "children_data": [],
          "configurable_options": [
            {
              "attribute_id": 93,
              "values": [
                {
                  "value_index": 49
                },
                {
                  "value_index": 52
                },
                {
                  "value_index": 56
                }
              ],
              "product_id": 19,
              "id": 3,
              "label": "Color",
              "position": 0
            },
            {
              "attribute_id": 157,
              "values": [
                {
                  "value_index": 167
                },
                {
                  "value_index": 168
                },
                {
                  "value_index": 169
                },
                {
                  "value_index": 170
                },
                {
                  "value_index": 171
                }
              ],
              "product_id": 19,
              "id": 2,
              "label": "Size",
              "position": 0
            }
          ],
          "configurable_children": [
            {
              "price": 52,
              "name": "Chaz Kangeroo Hoodie-XS-Black",
              "sku": "MH01-XS-Black",
              "custom_attributes": [
                {
                  "value": "0",
                  "attribute_code": "required_options"
                },
                {
                  "value": "0",
                  "attribute_code": "has_options"
                },
                {
                  "value": "2",
                  "attribute_code": "tax_class_id"
                },
                {
                  "value": [
                    "15",
                    "36",
                    "2"
                  ],
                  "attribute_code": "category_ids"
                },
                {
                  "value": "167",
                  "attribute_code": "size"
                },
                {
                  "value": "49",
                  "attribute_code": "color"
                },
                {
                  "value": "/m/h/mh01-black_main.jpg",
                  "attribute_code": "image"
                },
                {
                  "value": "/m/h/mh01-black_main.jpg",
                  "attribute_code": "small_image"
                },
                {
                  "value": "/m/h/mh01-black_main.jpg",
                  "attribute_code": "thumbnail"
                },
                {
                  "value": "chaz-kangeroo-hoodie-xs-black",
                  "attribute_code": "url_key"
                },
                {
                  "value": "0",
                  "attribute_code": "msrp_display_actual_price_type"
                }
              ]
            },
            {
              "price": 52,
              "name": "Chaz Kangeroo Hoodie-XS-Gray",
              "sku": "MH01-XS-Gray",
              "custom_attributes": [
                {
                  "value": "0",
                  "attribute_code": "required_options"
                },
                {
                  "value": "0",
                  "attribute_code": "has_options"
                },
                {
                  "value": "2",
                  "attribute_code": "tax_class_id"
                },
                {
                  "value": [
                    "15",
                    "36",
                    "2"
                  ],
                  "attribute_code": "category_ids"
                },
                {
                  "value": "167",
                  "attribute_code": "size"
                },
                {
                  "value": "52",
                  "attribute_code": "color"
                },
                {
                  "value": "/m/h/mh01-gray_main.jpg",
                  "attribute_code": "image"
                },
                {
                  "value": "/m/h/mh01-gray_main.jpg",
                  "attribute_code": "small_image"
                },
                {
                  "value": "/m/h/mh01-gray_main.jpg",
                  "attribute_code": "thumbnail"
                },
                {
                  "value": "chaz-kangeroo-hoodie-xs-gray",
                  "attribute_code": "url_key"
                },
                {
                  "value": "0",
                  "attribute_code": "msrp_display_actual_price_type"
                }
              ]
            },
            {
              "price": 52,
              "name": "Chaz Kangeroo Hoodie-XS-Orange",
              "sku": "MH01-XS-Orange",
              "custom_attributes": [
                {
                  "value": "0",
                  "attribute_code": "required_options"
                },
                {
                  "value": "0",
                  "attribute_code": "has_options"
                },
                {
                  "value": "2",
                  "attribute_code": "tax_class_id"
                },
                {
                  "value": [
                    "15",
                    "36",
                    "2"
                  ],
                  "attribute_code": "category_ids"
                },
                {
                  "value": "167",
                  "attribute_code": "size"
                },
                {
                  "value": "56",
                  "attribute_code": "color"
                },
                {
                  "value": "/m/h/mh01-orange_main.jpg",
                  "attribute_code": "image"
                },
                {
                  "value": "/m/h/mh01-orange_main.jpg",
                  "attribute_code": "small_image"
                },
                {
                  "value": "/m/h/mh01-orange_main.jpg",
                  "attribute_code": "thumbnail"
                },
                {
                  "value": "chaz-kangeroo-hoodie-xs-orange",
                  "attribute_code": "url_key"
                },
                {
                  "value": "0",
                  "attribute_code": "msrp_display_actual_price_type"
                }
              ]
            },
            {
              "price": 52,
              "name": "Chaz Kangeroo Hoodie-S-Black",
              "sku": "MH01-S-Black",
              "custom_attributes": [
                {
                  "value": "0",
                  "attribute_code": "required_options"
                },
                {
                  "value": "0",
                  "attribute_code": "has_options"
                },
                {
                  "value": "2",
                  "attribute_code": "tax_class_id"
                },
                {
                  "value": [
                    "15",
                    "36",
                    "2"
                  ],
                  "attribute_code": "category_ids"
                },
                {
                  "value": "168",
                  "attribute_code": "size"
                },
                {
                  "value": "49",
                  "attribute_code": "color"
                },
                {
                  "value": "/m/h/mh01-black_main.jpg",
                  "attribute_code": "image"
                },
                {
                  "value": "/m/h/mh01-black_main.jpg",
                  "attribute_code": "small_image"
                },
                {
                  "value": "/m/h/mh01-black_main.jpg",
                  "attribute_code": "thumbnail"
                },
                {
                  "value": "chaz-kangeroo-hoodie-s-black",
                  "attribute_code": "url_key"
                },
                {
                  "value": "0",
                  "attribute_code": "msrp_display_actual_price_type"
                }
              ]
            },
            {
              "price": 52,
              "name": "Chaz Kangeroo Hoodie-S-Gray",
              "sku": "MH01-S-Gray",
              "custom_attributes": [
                {
                  "value": "0",
                  "attribute_code": "required_options"
                },
                {
                  "value": "0",
                  "attribute_code": "has_options"
                },
                {
                  "value": "2",
                  "attribute_code": "tax_class_id"
                },
                {
                  "value": [
                    "15",
                    "36",
                    "2"
                  ],
                  "attribute_code": "category_ids"
                },
                {
                  "value": "168",
                  "attribute_code": "size"
                },
                {
                  "value": "52",
                  "attribute_code": "color"
                },
                {
                  "value": "/m/h/mh01-gray_main.jpg",
                  "attribute_code": "image"
                },
                {
                  "value": "/m/h/mh01-gray_main.jpg",
                  "attribute_code": "small_image"
                },
                {
                  "value": "/m/h/mh01-gray_main.jpg",
                  "attribute_code": "thumbnail"
                },
                {
                  "value": "chaz-kangeroo-hoodie-s-gray",
                  "attribute_code": "url_key"
                },
                {
                  "value": "0",
                  "attribute_code": "msrp_display_actual_price_type"
                }
              ]
            },
            {
              "price": 52,
              "name": "Chaz Kangeroo Hoodie-S-Orange",
              "sku": "MH01-S-Orange",
              "custom_attributes": [
                {
                  "value": "0",
                  "attribute_code": "required_options"
                },
                {
                  "value": "0",
                  "attribute_code": "has_options"
                },
                {
                  "value": "2",
                  "attribute_code": "tax_class_id"
                },
                {
                  "value": [
                    "15",
                    "36",
                    "2"
                  ],
                  "attribute_code": "category_ids"
                },
                {
                  "value": "168",
                  "attribute_code": "size"
                },
                {
                  "value": "56",
                  "attribute_code": "color"
                },
                {
                  "value": "/m/h/mh01-orange_main.jpg",
                  "attribute_code": "image"
                },
                {
                  "value": "/m/h/mh01-orange_main.jpg",
                  "attribute_code": "small_image"
                },
                {
                  "value": "/m/h/mh01-orange_main.jpg",
                  "attribute_code": "thumbnail"
                },
                {
                  "value": "chaz-kangeroo-hoodie-s-orange",
                  "attribute_code": "url_key"
                },
                {
                  "value": "0",
                  "attribute_code": "msrp_display_actual_price_type"
                }
              ]
            },
            {
              "price": 52,
              "name": "Chaz Kangeroo Hoodie-M-Black",
              "sku": "MH01-M-Black",
              "custom_attributes": [
                {
                  "value": "0",
                  "attribute_code": "required_options"
                },
                {
                  "value": "0",
                  "attribute_code": "has_options"
                },
                {
                  "value": "2",
                  "attribute_code": "tax_class_id"
                },
                {
                  "value": [
                    "15",
                    "36",
                    "2"
                  ],
                  "attribute_code": "category_ids"
                },
                {
                  "value": "169",
                  "attribute_code": "size"
                },
                {
                  "value": "49",
                  "attribute_code": "color"
                },
                {
                  "value": "/m/h/mh01-black_main.jpg",
                  "attribute_code": "image"
                },
                {
                  "value": "/m/h/mh01-black_main.jpg",
                  "attribute_code": "small_image"
                },
                {
                  "value": "/m/h/mh01-black_main.jpg",
                  "attribute_code": "thumbnail"
                },
                {
                  "value": "chaz-kangeroo-hoodie-m-black",
                  "attribute_code": "url_key"
                },
                {
                  "value": "0",
                  "attribute_code": "msrp_display_actual_price_type"
                }
              ]
            },
            {
              "price": 52,
              "name": "Chaz Kangeroo Hoodie-M-Gray",
              "sku": "MH01-M-Gray",
              "custom_attributes": [
                {
                  "value": "0",
                  "attribute_code": "required_options"
                },
                {
                  "value": "0",
                  "attribute_code": "has_options"
                },
                {
                  "value": "2",
                  "attribute_code": "tax_class_id"
                },
                {
                  "value": [
                    "15",
                    "36",
                    "2"
                  ],
                  "attribute_code": "category_ids"
                },
                {
                  "value": "169",
                  "attribute_code": "size"
                },
                {
                  "value": "52",
                  "attribute_code": "color"
                },
                {
                  "value": "/m/h/mh01-gray_main.jpg",
                  "attribute_code": "image"
                },
                {
                  "value": "/m/h/mh01-gray_main.jpg",
                  "attribute_code": "small_image"
                },
                {
                  "value": "/m/h/mh01-gray_main.jpg",
                  "attribute_code": "thumbnail"
                },
                {
                  "value": "chaz-kangeroo-hoodie-m-gray",
                  "attribute_code": "url_key"
                },
                {
                  "value": "0",
                  "attribute_code": "msrp_display_actual_price_type"
                }
              ]
            },
            {
              "price": 52,
              "name": "Chaz Kangeroo Hoodie-M-Orange",
              "sku": "MH01-M-Orange",
              "custom_attributes": [
                {
                  "value": "0",
                  "attribute_code": "required_options"
                },
                {
                  "value": "0",
                  "attribute_code": "has_options"
                },
                {
                  "value": "2",
                  "attribute_code": "tax_class_id"
                },
                {
                  "value": [
                    "15",
                    "36",
                    "2"
                  ],
                  "attribute_code": "category_ids"
                },
                {
                  "value": "169",
                  "attribute_code": "size"
                },
                {
                  "value": "56",
                  "attribute_code": "color"
                },
                {
                  "value": "/m/h/mh01-orange_main.jpg",
                  "attribute_code": "image"
                },
                {
                  "value": "/m/h/mh01-orange_main.jpg",
                  "attribute_code": "small_image"
                },
                {
                  "value": "/m/h/mh01-orange_main.jpg",
                  "attribute_code": "thumbnail"
                },
                {
                  "value": "chaz-kangeroo-hoodie-m-orange",
                  "attribute_code": "url_key"
                },
                {
                  "value": "0",
                  "attribute_code": "msrp_display_actual_price_type"
                }
              ]
            },
            {
              "price": 52,
              "name": "Chaz Kangeroo Hoodie-L-Black",
              "sku": "MH01-L-Black",
              "custom_attributes": [
                {
                  "value": "0",
                  "attribute_code": "required_options"
                },
                {
                  "value": "0",
                  "attribute_code": "has_options"
                },
                {
                  "value": "2",
                  "attribute_code": "tax_class_id"
                },
                {
                  "value": [
                    "15",
                    "36",
                    "2"
                  ],
                  "attribute_code": "category_ids"
                },
                {
                  "value": "170",
                  "attribute_code": "size"
                },
                {
                  "value": "49",
                  "attribute_code": "color"
                },
                {
                  "value": "/m/h/mh01-black_main.jpg",
                  "attribute_code": "image"
                },
                {
                  "value": "/m/h/mh01-black_main.jpg",
                  "attribute_code": "small_image"
                },
                {
                  "value": "/m/h/mh01-black_main.jpg",
                  "attribute_code": "thumbnail"
                },
                {
                  "value": "chaz-kangeroo-hoodie-l-black",
                  "attribute_code": "url_key"
                },
                {
                  "value": "0",
                  "attribute_code": "msrp_display_actual_price_type"
                }
              ]
            },
            {
              "price": 52,
              "name": "Chaz Kangeroo Hoodie-L-Gray",
              "sku": "MH01-L-Gray",
              "custom_attributes": [
                {
                  "value": "0",
                  "attribute_code": "required_options"
                },
                {
                  "value": "0",
                  "attribute_code": "has_options"
                },
                {
                  "value": "2",
                  "attribute_code": "tax_class_id"
                },
                {
                  "value": [
                    "15",
                    "36",
                    "2"
                  ],
                  "attribute_code": "category_ids"
                },
                {
                  "value": "170",
                  "attribute_code": "size"
                },
                {
                  "value": "52",
                  "attribute_code": "color"
                },
                {
                  "value": "/m/h/mh01-gray_main.jpg",
                  "attribute_code": "image"
                },
                {
                  "value": "/m/h/mh01-gray_main.jpg",
                  "attribute_code": "small_image"
                },
                {
                  "value": "/m/h/mh01-gray_main.jpg",
                  "attribute_code": "thumbnail"
                },
                {
                  "value": "chaz-kangeroo-hoodie-l-gray",
                  "attribute_code": "url_key"
                },
                {
                  "value": "0",
                  "attribute_code": "msrp_display_actual_price_type"
                }
              ]
            },
            {
              "price": 52,
              "name": "Chaz Kangeroo Hoodie-L-Orange",
              "sku": "MH01-L-Orange",
              "custom_attributes": [
                {
                  "value": "0",
                  "attribute_code": "required_options"
                },
                {
                  "value": "0",
                  "attribute_code": "has_options"
                },
                {
                  "value": "2",
                  "attribute_code": "tax_class_id"
                },
                {
                  "value": [
                    "15",
                    "36",
                    "2"
                  ],
                  "attribute_code": "category_ids"
                },
                {
                  "value": "170",
                  "attribute_code": "size"
                },
                {
                  "value": "56",
                  "attribute_code": "color"
                },
                {
                  "value": "/m/h/mh01-orange_main.jpg",
                  "attribute_code": "image"
                },
                {
                  "value": "/m/h/mh01-orange_main.jpg",
                  "attribute_code": "small_image"
                },
                {
                  "value": "/m/h/mh01-orange_main.jpg",
                  "attribute_code": "thumbnail"
                },
                {
                  "value": "chaz-kangeroo-hoodie-l-orange",
                  "attribute_code": "url_key"
                },
                {
                  "value": "0",
                  "attribute_code": "msrp_display_actual_price_type"
                }
              ]
            },
            {
              "price": 52,
              "name": "Chaz Kangeroo Hoodie-XL-Black",
              "sku": "MH01-XL-Black",
              "custom_attributes": [
                {
                  "value": "0",
                  "attribute_code": "required_options"
                },
                {
                  "value": "0",
                  "attribute_code": "has_options"
                },
                {
                  "value": "2",
                  "attribute_code": "tax_class_id"
                },
                {
                  "value": [
                    "15",
                    "36",
                    "2"
                  ],
                  "attribute_code": "category_ids"
                },
                {
                  "value": "171",
                  "attribute_code": "size"
                },
                {
                  "value": "49",
                  "attribute_code": "color"
                },
                {
                  "value": "/m/h/mh01-black_main.jpg",
                  "attribute_code": "image"
                },
                {
                  "value": "/m/h/mh01-black_main.jpg",
                  "attribute_code": "small_image"
                },
                {
                  "value": "/m/h/mh01-black_main.jpg",
                  "attribute_code": "thumbnail"
                },
                {
                  "value": "chaz-kangeroo-hoodie-xl-black",
                  "attribute_code": "url_key"
                },
                {
                  "value": "0",
                  "attribute_code": "msrp_display_actual_price_type"
                }
              ]
            },
            {
              "price": 52,
              "name": "Chaz Kangeroo Hoodie-XL-Gray",
              "sku": "MH01-XL-Gray",
              "custom_attributes": [
                {
                  "value": "0",
                  "attribute_code": "required_options"
                },
                {
                  "value": "0",
                  "attribute_code": "has_options"
                },
                {
                  "value": "2",
                  "attribute_code": "tax_class_id"
                },
                {
                  "value": [
                    "15",
                    "36",
                    "2"
                  ],
                  "attribute_code": "category_ids"
                },
                {
                  "value": "171",
                  "attribute_code": "size"
                },
                {
                  "value": "52",
                  "attribute_code": "color"
                },
                {
                  "value": "/m/h/mh01-gray_main.jpg",
                  "attribute_code": "image"
                },
                {
                  "value": "/m/h/mh01-gray_main.jpg",
                  "attribute_code": "small_image"
                },
                {
                  "value": "/m/h/mh01-gray_main.jpg",
                  "attribute_code": "thumbnail"
                },
                {
                  "value": "chaz-kangeroo-hoodie-xl-gray",
                  "attribute_code": "url_key"
                },
                {
                  "value": "0",
                  "attribute_code": "msrp_display_actual_price_type"
                }
              ]
            },
            {
              "price": 52,
              "name": "Chaz Kangeroo Hoodie-XL-Orange",
              "sku": "MH01-XL-Orange",
              "custom_attributes": [
                {
                  "value": "0",
                  "attribute_code": "required_options"
                },
                {
                  "value": "0",
                  "attribute_code": "has_options"
                },
                {
                  "value": "2",
                  "attribute_code": "tax_class_id"
                },
                {
                  "value": [
                    "15",
                    "36",
                    "2"
                  ],
                  "attribute_code": "category_ids"
                },
                {
                  "value": "171",
                  "attribute_code": "size"
                },
                {
                  "value": "56",
                  "attribute_code": "color"
                },
                {
                  "value": "/m/h/mh01-orange_main.jpg",
                  "attribute_code": "image"
                },
                {
                  "value": "/m/h/mh01-orange_main.jpg",
                  "attribute_code": "small_image"
                },
                {
                  "value": "/m/h/mh01-orange_main.jpg",
                  "attribute_code": "thumbnail"
                },
                {
                  "value": "chaz-kangeroo-hoodie-xl-orange",
                  "attribute_code": "url_key"
                },
                {
                  "value": "0",
                  "attribute_code": "msrp_display_actual_price_type"
                }
              ]
            }
          ],
          "category_ids": [
            "3",
            "7",
            "5",
            "8"
          ],
          "stock": {
            "min_sale_qty": 1,
            "qty_increments": 0,
            "stock_status_changed_auto": 0,
            "is_in_stock": true,
            "show_default_notification_message": false,
            "use_config_max_sale_qty": true,
            "product_id": 19,
            "use_config_qty_increments": true,
            "notify_stock_qty": 1,
            "manage_stock": true,
            "item_id": 19,
            "min_qty": 0,
            "use_config_min_qty": true,
            "use_config_notify_stock_qty": true,
            "stock_id": 1,
            "use_config_backorders": true,
            "max_sale_qty": 10000,
            "backorders": 0,
            "qty": 100,
            "use_config_enable_qty_inc": true,
            "is_decimal_divided": false,
            "enable_qty_increments": false,
            "is_qty_decimal": false,
            "use_config_manage_stock": true,
            "low_stock_date": null,
            "use_config_min_sale_qty": 1
          }
        }
      }
    ]
  }
```

## Category type

The proposed data format is a result of:

- [catalogCategoryListV1GetListGet](http://devdocs.magento.com/swagger/#!/catalogCategoryListV1/catalogCategoryListV1GetListGet)

```json
{
  "_index": "storefront_catalog",
  "_type": "category",
  "_id": "22",
  "_score": 1,
  "_source": {
    "id": 22,
    "parent_id": 20,
    "name": "Bottoms",
    "is_active": true,
    "position": 2,
    "level": 3,
    "product_count": 0,
    "children_data": [
      {
        "is_active": true,
        "level": 4,
        "parent_id": 22,
        "product_count": 91,
        "name": "Pants",
        "id": 27,
        "position": 1,
        "children_data": []
      },
      {
        "is_active": true,
        "level": 4,
        "parent_id": 22,
        "product_count": 137,
        "name": "Shorts",
        "id": 28,
        "position": 2,
        "children_data": []
      }
    ],
    "tsk": 1509551138285
  }
}
```

## Attribute type

The data format here is a result of:

- [catalogProductAttributeRepositoryV1GetListGet](http://devdocs.magento.com/swagger/#!/catalogProductAttributeRepositoryV1/catalogProductAttributeRepositoryV1GetListGet)

```json
{
  "_index": "storefront_catalog",
  "_type": "attribute",
  "_id": "79",
  "_score": 1,
  "_source": {
    "is_wysiwyg_enabled": false,
    "is_html_allowed_on_front": false,
    "used_for_sort_by": false,
    "is_filterable": false,
    "is_filterable_in_search": false,
    "is_used_in_grid": true,
    "is_visible_in_grid": false,
    "is_filterable_in_grid": false,
    "position": 0,
    "apply_to": ["simple", "virtual", "bundle", "downloadable", "configurable"],
    "is_searchable": "0",
    "is_visible_in_advanced_search": "0",
    "is_comparable": "0",
    "is_used_for_promo_rules": "0",
    "is_visible_on_front": "0",
    "used_in_product_listing": "1",
    "is_visible": true,
    "scope": "website",
    "attribute_id": 79,
    "attribute_code": "special_from_date",
    "frontend_input": "date",
    "entity_type_id": "4",
    "is_required": false,
    "options": [],
    "is_user_defined": false,
    "default_frontend_label": "Special Price From Date",
    "frontend_labels": null,
    "backend_type": "datetime",
    "backend_model": "Magento\\Catalog\\Model\\Attribute\\Backend\\Startdate",
    "is_unique": "0",
    "validation_rules": [],
    "id": 79,
    "tsk": 1510353353440
  }
}
```

## TaxRule type

The suggested data format is a combined result of:

- [taxTaxRuleRepositoryV1GetListGet](http://devdocs.magento.com/swagger/#!/taxTaxRuleRepositoryV1/taxTaxRuleRepositoryV1GetListGet)
- [taxTaxRateRepositoryV1GetGet](http://devdocs.magento.com/swagger/#!/taxTaxRateRepositoryV1/taxTaxRateRepositoryV1GetGet)

```json
{
  "id": 2,
  "code": "Poland",
  "priority": 0,
  "position": 0,
  "customer_tax_class_ids": [3],
  "product_tax_class_ids": [2],
  "tax_rate_ids": [4],
  "calculate_subtotal": false,
  "rates": [
    {
      "id": 4,
      "tax_country_id": "PL",
      "tax_region_id": 0,
      "tax_postcode": "*",
      "rate": 23,
      "code": "VAT23%",
      "titles": []
    }
  ],
  "tsk": 1510603185144
}
```

# Example ElasticSearch queries

Elasticsearch is the main data store and [elasticsearch-js library](https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/index.html) is used for accessing the data store. We're also using the [bodybuilder module](https://www.npmjs.com/package/bodybuilder) for easier ES query building.

## Product search

```json
 starting request {
    "method": "POST",
    "path": "/vue_storefront_catalog/product/_search",
    "body": {
      "query": {
        "bool": {
          "filter": {
            "bool": {
              "must": [
                {
                  "range": {
                    "visibility": {
                      "gte": 3,
                      "lte": 4
                    }
                  }
                },
                {
                  "terms": {
                    "category.category_id": [
                      20,
                      21,
                      23
                    ]
                  }
                }
              ],
              "should": [
                {
                  "bool": {
                    "must": [
                      {
                        "match": {
                          "color": 53
                        }
                      },
                      {
                        "match": {
                          "size": 173
                        }
                      },
                      {
                        "match": {
                          "type_id": "simple"
                        }
                      }
                    ]
                  }
                },
                {
                  "bool": {
                    "must": [
                      {
                        "match": {
                          "color_options": 53
                        }
                      },
                      {
                        "match": {
                          "size_options": 173
                        }
                      },
                      {
                        "match": {
                          "type_id": "configurable"
                        }
                      }
                    ]
                  }
                }
              ]
            }
          },
          "must": {
            "range": {
              "price": {
                "gt": 0
              }
            }
          }
        }
      },
      "aggs": {
        "agg_terms_color": {
          "terms": {
            "field": "color"
          }
        },
        "agg_terms_color_options": {
          "terms": {
            "field": "color_options"
          }
        },
        "agg_terms_size": {
          "terms": {
            "field": "size"
          }
        },
        "agg_terms_size_options": {
          "terms": {
            "field": "size_options"
          }
        },
        "agg_terms_price": {
          "terms": {
            "field": "price"
          }
        },
        "agg_range_price": {
          "range": {
            "field": "price",
            "ranges": [
              {
                "from": 0,
                "to": 50
              },
              {
                "from": 50,
                "to": 100
              },
              {
                "from": 100,
                "to": 150
              },
              {
                "from": 150
              }
            ]
          }
        }
      }
    },
    "query": {
      "size": 18,
      "from": 0,
      "sort": ""
    }
  }
```

## List categories

```json
  starting request {
    "method": "POST",
    "path": "/vue_storefront_catalog/category/_search",
    "body": {
      "query": {
        "bool": {
          "filter": {
            "term": {
              "is_active": true
            }
          }
        }
      }
    },
    "query": {
      "size": 50,
      "from": 0,
      "sort": "position:asc"
    }
  }
```

## Get attributes for filters (on category page)

```json
  starting request {
    "method": "POST",
    "path": "/vue_storefront_catalog/attribute/_search",
    "body": {
      "query": {
        "bool": {
          "filter": {
            "bool": {
              "should": [
                {
                  "term": {
                    "attribute_id": "93"
                  }
                },
                {
                  "term": {
                    "attribute_id": "141"
                  }
                }
              ]
            }
          }
        }
      }
    },
    "query": {
      "size": 50,
      "from": 0,
      "sort": ""
    }
  }
```

## Get attributes for product page

```json
  starting request {
    "method": "POST",
    "path": "/vue_storefront_catalog/attribute/_search",
    "body": {
      "query": {
        "bool": {
          "filter": {
            "bool": {
              "should": [
                {
                  "term": {
                    "is_user_defined": true
                  }
                }
              ]
            }
          }
        }
      }
    },
    "query": {
      "size": 50,
      "from": 0,
      "sort": ""
    }
  }
```
