# Vue Storefront API - draft

Vue Storefront is powered by vue-storefront-api data middleware. It's a REST service which unifies all the differences between eCommerce platforms under one, platform agnostic API. Please find more details about the project [on Github](http://github.com/DivanteLtd/vue-storefront-api).

**TO DO - METHODS BE DOCUMENTED:**

```
POST /api/user/me
GET /api/user/order-history
POST /api/user/changePassword
POST /api/order/create

POST /api/cart/apply-coupon
POST /api/cart/delete-coupon
GET /api/cart/coupon


GET /img
GET /product/list
GET /product/render-list
POST /api/catalog
```

Read more on:

- [3rd party platform integration with Vue Storefront](https://medium.com/@piotrkarwatka/how-to-connect-3rd-party-platform-to-vue-storefront-df9cb30779f6?source=user_profile---------18----------------)
- [Integrating Magento cart and orders](https://medium.com/@piotrkarwatka/vue-storefront-cart-totals-orders-integration-with-magento2-6fbe6860fcd?source=user_profile---------9----------------)

All methods accept and respond with `application/json` content type.

## Cart module

Cart module is in charge of creating the eCommerce backend shopping carts and synchronizing the items users have in Vue Storefront and eCommerce backend. For example it can synchronize Vue Storefront shopping cart with the Magento quotes.

### POST [/api/cart/create]()

#### WHEN:

This method is called when new Vue Storefront shopping cart is created. First visit, page refresh, after user-authorization ... If the `token` GET parameter is provided it's called as logged-in user; if not - it's called as guest-user. To draw the difference - let's keep to Magento example. For guest user vue-storefront-api is subsequently operating on `/guest-carts` API endpoints and for authorized users on `/carts/` endpoints)

#### GET PARAMS:
`token` - null OR user token returned from [`/api/user/login`](https://github.com/DivanteLtd/vue-storefront-api/blob/7d98771994b1009ad17d69c458f9e93686cfb145/src/api/user.js#L48)

#### REQUEST BODY:
```
null
```

#### EXAMPLE CALL:

```bash
curl 'https://demo.vuestorefront.io/api/cart/create' -X POST
```

For authorized user:

```bash
curl 'https://demo.vuestorefront.io/api/cart/create?token=xu8h02nd66yq0gaayj4x3kpqwity02or' -X POST
```


#### RESPONSE BODY:

For guest user

```
{
    "code": 200,
    "result": "a17b9b5fb9f56652b8280bb94c52cd93"
}
```

The `result` is a guest-cart id that should be used for all subsequent cart related operations as `?cartId=a17b9b5fb9f56652b8280bb94c52cd93`

For authorized user
```
{
    "code":200,
    "result":"81668"
}
```
The `result` is a cart-id that should be used for all subsequent cart related operations as `?cartId=81668`

#### RESPONSE CODES:

- `200` when success
- `500` in case of error


### POST [/api/cart/pull]()

#### GET PARAMS:
`token`
`cartId`

#### RESPONSE BODY:
```json
{"code":200,"result":[{"item_id":5853,"sku":"MS10-XS-Black","qty":1,"name":"Logan  HeatTec&reg; Tee-XS-Black","price":0,"product_type":"simple","quote_id":"81668"}]}
```


### POST [/api/cart/update]()

#### GET PARAMS:
`token`
`cartId`

#### REQUEST BODY:

```json
{"cartItem":{"sku":"MS10-XS-Black","qty":2,"item_id":5853,"quoteId":"81668"}}
```

#### RESPONSE BODY:

```json
{"code":200,"result":{"item_id":5853,"sku":"MS10-XS-Black","qty":2,"name":"Logan  HeatTec&reg; Tee-XS-Black","price":24,"product_type":"simple","quote_id":"81668"}}
```

### POST [/api/cart/delete]()

#### GET PARAMS:
`token`
`cartId`

#### EXAMPLE CALL:

```bash
curl 'https://demo.vuestorefront.io/api/cart/delete?token=xu8h02nd66yq0gaayj4x3kpqwity02or&cartId=81668' -H 'content-type: application/json' -H 'accept: */*' --data-binary '{"cartItem":{"sku":"MS10-XS-Black","item_id":5853,"quoteId":"81668"}}' --compressed
```

#### REQUEST BODY:

```json
{"cartItem":{"sku":"MS10-XS-Black","item_id":5853,"quoteId":"81668"}}
```

#### RESPONSE BODY:

```json
{"code":200,"result":true}
```


### GET [/api/cart/totals]()

#### EXAMPLE CALL:

```bash
curl 'https://demo.vuestorefront.io/api/cart/totals?token=xu8h02nd66yq0gaayj4x3kpqwity02or&cartId=81668' -H 'content-type: application/json' -H 'accept: */*'
```

#### GET PARAMS:
`token`
`cartId`

#### RESPONSE BODY:

```json
{"code":200,"result":{"grand_total":0,"weee_tax_applied_amount":null,"base_currency_code":"USD","quote_currency_code":"USD","items_qty":1,"items":[{"item_id":5853,"price":0,"base_price":0,"qty":1,"row_total":0,"base_row_total":0,"row_total_with_discount":0,"tax_amount":0,"base_tax_amount":0,"tax_percent":0,"discount_amount":0,"base_discount_amount":0,"discount_percent":0,"options":"[]","weee_tax_applied_amount":null,"weee_tax_applied":null,"name":"Logan  HeatTec&reg; Tee-XS-Black"}],"total_segments":[{"code":"subtotal","title":"Subtotal","value":0},{"code":"shipping","title":"Shipping & Handling","value":null},{"code":"tax","title":"Tax","value":0,"extension_attributes":{"tax_grandtotal_details":[]}},{"code":"grand_total","title":"Grand Total","value":null,"area":"footer"}]}}
```

### GET [/api/cart/payment-methods]()

#### EXAMPLE CALL:

```bash
curl 'https://demo.vuestorefront.io/api/cart/payment-methods?token=xu8h02nd66yq0gaayj4x3kpqwity02or&cartId=81668' -H 'content-type: application/json' -H 'accept: */*'
```

#### GET PARAMS:
`token`
`cartId`

#### RESPONSE BODY:

```json
{"code":200,"result":[{"code":"cashondelivery","title":"Cash On Delivery"},{"code":"checkmo","title":"Check / Money order"},{"code":"free","title":"No Payment Information Required"}]}
```

### POST [/api/cart/shipping-methods]()

#### EXAMPLE CALL:

```bash
curl 'https://demo.vuestorefront.io/api/cart/shipping-methods?token=xu8h02nd66yq0gaayj4x3kpqwity02or&cartId=81668' -H 'content-type: application/json' -H 'accept: */*' --data-binary '{"address":{"country_id":"PL"}}'
```

#### GET PARAMS:
`token`
`cartId`

#### REQUEST BODY:

```json
{"address":{"country_id":"PL"}}
```

#### RESPONSE BODY:

```json
{"code":200,"result":[{"carrier_code":"flatrate","method_code":"flatrate","carrier_title":"Flat Rate","method_title":"Fixed","amount":5,"base_amount":5,"available":true,"error_message":"","price_excl_tax":5,"price_incl_tax":5}]}
```

### POST [/api/cart/shipping-information]()

#### EXAMPLE CALL:

```bash
curl 'https://demo.vuestorefront.io/api/cart/shipping-information?token=xu8h02nd66yq0gaayj4x3kpqwity02or&cartId=81668' -H 'content-type: application/json' -H 'accept: */*' --data-binary '{"addressInformation":{"shipping_address":{"country_id":"PL"},"shipping_method_code":"flatrate","shipping_carrier_code":"flatrate"}}'
```

#### GET PARAMS:
`token`
`cartId`

#### REQUEST BODY:

```json
{"addressInformation":{"shipping_address":{"country_id":"PL"},"shipping_method_code":"flatrate","shipping_carrier_code":"flatrate"}}
```

#### RESPONSE BODY:

```json
{"code":200,"result":{"payment_methods":[{"code":"cashondelivery","title":"Cash On Delivery"},{"code":"checkmo","title":"Check / Money order"}],"totals":{"grand_total":45.8,"base_grand_total":55.18,"subtotal":48,"base_subtotal":48,"discount_amount":-8.86,"base_discount_amount":-8.86,"subtotal_with_discount":39.14,"base_subtotal_with_discount":39.14,"shipping_amount":5,"base_shipping_amount":5,"shipping_discount_amount":0,"base_shipping_discount_amount":0,"tax_amount":9.38,"base_tax_amount":9.38,"weee_tax_applied_amount":null,"shipping_tax_amount":0,"base_shipping_tax_amount":0,"subtotal_incl_tax":59.04,"shipping_incl_tax":5,"base_shipping_incl_tax":5,"base_currency_code":"USD","quote_currency_code":"USD","items_qty":2,"items":[{"item_id":5853,"price":24,"base_price":24,"qty":2,"row_total":48,"base_row_total":48,"row_total_with_discount":0,"tax_amount":9.38,"base_tax_amount":9.38,"tax_percent":23,"discount_amount":8.86,"base_discount_amount":8.86,"discount_percent":15,"price_incl_tax":29.52,"base_price_incl_tax":29.52,"row_total_incl_tax":59.04,"base_row_total_incl_tax":59.04,"options":"[]","weee_tax_applied_amount":null,"weee_tax_applied":null,"name":"Logan  HeatTec&reg; Tee-XS-Black"}],"total_segments":[{"code":"subtotal","title":"Subtotal","value":59.04},{"code":"shipping","title":"Shipping & Handling (Flat Rate - Fixed)","value":5},{"code":"discount","title":"Discount","value":-8.86},{"code":"tax","title":"Tax","value":9.38,"area":"taxes","extension_attributes":{"tax_grandtotal_details":[{"amount":9.38,"rates":[{"percent":"23","title":"VAT23"}],"group_id":1}]}},{"code":"grand_total","title":"Grand Total","value":55.18,"area":"footer"}]}}}
```


### POST [/api/cart/collect-totals]()

#### EXAMPLE CALL:

```bash
curl 'https://demo.vuestorefront.io/api/cart/collect-totals?token=xu8h02nd66yq0gaayj4x3kpqwity02or&cartId=81668' -H 'content-type: application/json' -H 'accept: */*' --data-binary '{"methods":{"paymentMethod":{"method":"cashondelivery"},"shippingCarrierCode":"flatrate","shippingMethodCode":"flatrate"}}'
```

#### GET PARAMS:
`token`
`cartId`

#### REQUEST BODY:

```json
{"methods":{"paymentMethod":{"method":"cashondelivery"},"shippingCarrierCode":"flatrate","shippingMethodCode":"flatrate"}}
```

#### RESPONSE BODY:

```json
{"code":200,"result":{"grand_total":45.8,"base_grand_total":55.18,"subtotal":48,"base_subtotal":48,"discount_amount":-8.86,"base_discount_amount":-8.86,"subtotal_with_discount":39.14,"base_subtotal_with_discount":39.14,"shipping_amount":5,"base_shipping_amount":5,"shipping_discount_amount":0,"base_shipping_discount_amount":0,"tax_amount":9.38,"base_tax_amount":9.38,"weee_tax_applied_amount":null,"shipping_tax_amount":0,"base_shipping_tax_amount":0,"subtotal_incl_tax":59.04,"base_subtotal_incl_tax":59.04,"shipping_incl_tax":5,"base_shipping_incl_tax":5,"base_currency_code":"USD","quote_currency_code":"USD","items_qty":2,"items":[{"item_id":5853,"price":24,"base_price":24,"qty":2,"row_total":48,"base_row_total":48,"row_total_with_discount":0,"tax_amount":9.38,"base_tax_amount":9.38,"tax_percent":23,"discount_amount":8.86,"base_discount_amount":8.86,"discount_percent":15,"price_incl_tax":29.52,"base_price_incl_tax":29.52,"row_total_incl_tax":59.04,"base_row_total_incl_tax":59.04,"options":"[]","weee_tax_applied_amount":null,"weee_tax_applied":null,"name":"Logan  HeatTec&reg; Tee-XS-Black"}],"total_segments":[{"code":"subtotal","title":"Subtotal","value":59.04},{"code":"shipping","title":"Shipping & Handling (Flat Rate - Fixed)","value":5},{"code":"discount","title":"Discount","value":-8.86},{"code":"tax","title":"Tax","value":9.38,"area":"taxes","extension_attributes":{"tax_grandtotal_details":[{"amount":9.38,"rates":[{"percent":"23","title":"VAT23"}],"group_id":1}]}},{"code":"grand_total","title":"Grand Total","value":55.18,"area":"footer"}]}}
```

## User module

### POST [/api/user/create](https://github.com/DivanteLtd/vue-storefront-api/blob/7d98771994b1009ad17d69c458f9e93686cfb145/src/api/user.js#L25)

Registers new user to eCommerce backend users database. 

#### GET PARAMS:

```
null
```

#### EXAMPLE CALL:

```bash
curl 'https://demo.vuestorefront.io/api/user/create' -H 'content-type: application/json' -H 'accept: application/json, text/plain, */*'--data-binary '{"customer":{"email":"pkarwatka9998@divante.pl","firstname":"Joe","lastname":"Black"},"password":"SecretPassword!@#123"}'
```

#### REQUEST BODY:

```json
{"customer":{"email":"pkarwatka9998@divante.pl","firstname":"Joe","lastname":"Black"},"password":"SecretPassword"}
```

#### RESPONSE BODY:

In case of success

```json
{"code":200,"result":{"id":286,"group_id":1,"created_at":"2018-04-03 13:35:13","updated_at":"2018-04-03 13:35:13","created_in":"Default Store View","email":"pkarwatka9998@divante.pl","firstname":"Joe","lastname":"Black","store_id":1,"website_id":1,"addresses":[],"disable_auto_group_change":0}}
```

In case of error:

```json
{"code":500,"result":"Minimum of different classes of characters in password is 3. Classes of characters: Lower Case, Upper Case, Digits, Special Characters."}
```


### POST [/api/user/login](https://github.com/DivanteLtd/vue-storefront-api/blob/7d98771994b1009ad17d69c458f9e93686cfb145/src/api/user.js#L48)

Authorizes the user. It's called after user submits "Login" form inside the Vue Storefront app. It returns the user token which should be used for all subsequent API calls that requires authorization

#### GET PARAMS:

```
null
```

#### REQUEST BODY:

```json
{
    "username":"pkarwatka102@divante.pl",
    "password":"TopSecretPassword"}
```

#### RESPONSE BODY:

`curl 'https://demo.vuestorefront.io/api/user/login' -H 'content-type: application/json' -H 'accept: application/json' --data-binary '"username":"pkarwatka102@divante.pl","password":"TopSecretPassword}'`

```json
{
    "code":200,
    "result":"xu8h02nd66yq0gaayj4x3kpqwity02or"
}
```

or in case of error:

```json
{
    "code":500,
    "result":"You did not sign in correctly or your account is temporarily disabled."
}
```

The result is a authorization token, that should be passed via `?token=xu8h02nd66yq0gaayj4x3kpqwity02or` GET param to all subsequent API calls that requires authorization

#### RESPONSE CODES:

- `200` when success
- `500` in case of error




### POST [/api/user/resetPassword]()


#### GET PARAMS:

```
null
```

#### EXAMPLE CALL:

```bash
curl 'https://demo.vuestorefront.io/api/user/resetPassword' -H 'content-type: application/json' -H 'accept: application/json, text/plain, */*' --data-binary '{"email":"pkarwatka992@divante.pl"}'
```

#### REQUEST BODY:

```json
{"email":"pkarwatka992@divante.pl"}
```

#### RESPONSE BODY:

```json
{"code":500,"result":"No such entity with email = pkarwatka992@divante.pl, websiteId = 1"}
```


### GET [/api/user/me](https://github.com/DivanteLtd/vue-storefront-api/blob/7d98771994b1009ad17d69c458f9e93686cfb145/src/api/user.js#L78)

Gets the User profile for currently authorized user. It's called after `POST /api/user/login` successfull call.

#### GET PARAMS:

`token` - user token returned from `POST /api/user/login`

#### RESPONSE BODY:

```json
{
    "code":200,
    "result":
        {
            "id":158,
            "group_id":1,
            "default_shipping":"67",
            "created_at":"2018-02-28 12:05:39",
            "updated_at":"2018-03-29 10:46:03",
            "created_in":"Default Store View",
            "email":"pkarwatka102@divante.pl",
            "firstname":"Piotr",
            "lastname":"Karwatka",
            "store_id":1,
            "website_id":1,
            "addresses":[
                    {
                        "id":67,
                        "customer_id":158,
                        "region":
                            {
                                "region_code":null,
                                "region":null,
                                "region_id":0
                            },
                        "region_id":0,
                        "country_id":"PL",
                        "street": ["Street name","13"],
                        "telephone":"",
                        "postcode":"41-157",
                        "city":"Wrocław",
                        "firstname":"John","lastname":"Murphy",
                        "default_shipping":true
                    }],
            "disable_auto_group_change":0
        }
}
```
#### RESPONSE CODES:

- `200` when success
- `500` in case of error

## Stock module

### GET [`/api/stock/check/:sku`]

RESPONSE BODY:

```json
{"code":200,"result":{"item_id":580,"product_id":580,"stock_id":1,"qty":53,"is_in_stock":true,"is_qty_decimal":false,"show_default_notification_message":false,"use_config_min_qty":true,"min_qty":0,"use_config_min_sale_qty":1,"min_sale_qty":1,"use_config_max_sale_qty":true,"max_sale_qty":10000,"use_config_backorders":true,"backorders":0,"use_config_notify_stock_qty":true,"notify_stock_qty":1,"use_config_qty_increments":true,"qty_increments":0,"use_config_enable_qty_inc":true,"enable_qty_increments":false,"use_config_manage_stock":true,"manage_stock":true,"low_stock_date":null,"is_decimal_divided":false,"stock_status_changed_auto":0}}
```