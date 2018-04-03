# Vue Storefront API

Vue Storefront is powered by vue-storefront-api data middleware. It's a REST service which unifies all the differences between eCommerce platforms under one, platform agnostic API. Please find more details about the project [on Github](http://github.com/DivanteLtd/vue-storefront-api).

More on:

- [3rd party platform integration with Vue Storefront](https://medium.com/@piotrkarwatka/how-to-connect-3rd-party-platform-to-vue-storefront-df9cb30779f6?source=user_profile---------18----------------)
- [Integrating Magento cart and orders](https://medium.com/@piotrkarwatka/vue-storefront-cart-totals-orders-integration-with-magento2-6fbe6860fcd?source=user_profile---------9----------------)

All methods accept and respond with `application/json` content type.

## Cart module

Cart module is in charge of creating the eCommerce backend shopping carts and synchronizing the items users have in Vue Storefront and eCommerce backend. For example it can synchronize Vue Storefront shopping cart with the Magento quotes.

## POST [/api/cart/create]()

WHEN:

This method is called when new Vue Storefront shopping cart is created. First visit, page refresh, after user-authorization ... If the `token` GET parameter is provided it's called as logged-in user; if not - it's called as guest-user. To draw the difference - let's keep to Magento example. For guest user vue-storefront-api is subsequently operating on `/guest-carts` API endpoints and for authorized users on `/carts/` endpoints)

GET PARAMS:
`token` - null OR user token returned from [`/api/user/login`](https://github.com/DivanteLtd/vue-storefront-api/blob/7d98771994b1009ad17d69c458f9e93686cfb145/src/api/user.js#L48)

REQUEST BODY:
```
null
```

RESPONSE BODY:

For guest user 
`curl 'https://demo.vuestorefront.io/api/cart/create' -X POST`

```
{
    "code": 200,
    "result": "a17b9b5fb9f56652b8280bb94c52cd93"
}
```

The `result` is a guest-cart id that should be used for all subsequent cart related operations as `?cartId=a17b9b5fb9f56652b8280bb94c52cd93`

For authorized user

`curl 'https://demo.vuestorefront.io/api/cart/create?token=xu8h02nd66yq0gaayj4x3kpqwity02or' -X POST`

```
{
    "code":200,
    "result":"81668"
}
```
The `result` is a cart-id that should be used for all subsequent cart related operations as `?cartId=81668`

RESPONSE CODES:

- `200` when success
- `500` in case of error


## User module

## POST [/api/user/login](https://github.com/DivanteLtd/vue-storefront-api/blob/7d98771994b1009ad17d69c458f9e93686cfb145/src/api/user.js#L48)

Authorizes the user. It's called after user submits "Login" form inside the Vue Storefront app. It returns the user token which should be used for all subsequent API calls that requires authorization

GET PARAMS:
```
null
```

REQUEST BODY:
```json
{
    "username":"pkarwatka102@divante.pl",
    "password":"TopSecretPassword"}
```

RESPONSE BODY:

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


RESPONSE CODES:

- `200` when success
- `500` in case of error

## GET [/api/user/me](https://github.com/DivanteLtd/vue-storefront-api/blob/7d98771994b1009ad17d69c458f9e93686cfb145/src/api/user.js#L78)

Gets the User profile for currently authorized user. It's called after `POST /api/user/login` successfull call.

GET PARAMS:
`token` - user token returned from `POST /api/user/login`

RESPONSE BODY:
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


RESPONSE CODES:

- `200` when success
- `500` in case of error

## Stock module
