# Totals and cart sync with Magento

One of the key principles of the Vue Storefront architecture is full scalability. We've achieved very good performance results by not relying on the Magento 2/CMS API performance. By implementing the "divide and conquer" rule, we created the middleware and external data store for the catalog using Elasticsearch.

That was our first goal, but the second was to provide the full data safety and reliability to the business so we never encounter situations like stocks and prices being de-synchronized or the discount rules not being applied. It can ruin the business, no matter the performance 😃

## Cart and Totals sync

This is the reason we have the direct shopping cart sync with Magento 2. Whenever the user adds something to the cart, we're checking the stock and synchronizing the local in-browser cart with CMS.

![This is the dynamic requests architecture](../images/Vue-storefront-architecture-proxy-requests.png)

In the backward direction, we're always getting the current totals, after Magento shopping cart rules and discounts are applied to display the proper data to the user. This synchronization is implemented to keep the Vue Storefront platform-agnostic. The `vue-storefront-api` layer is in charge of translating the platform-specific API formats to the Vue Storefront general-data abstraction.

![This is how the cart sync works](../images/cart-sync.png)

As you can see, the synchronization works like a sequence of network calls to the `vue-storefront-api`:

1. The `pull` method is executed to get the current user's Magento cart.
2. On the client side, the logic is checking which elements are new on the client side, server side, removed.
3. In our case, one element doesn't exist on the server side so we're calling an `update` method to add it to the server cart.
4. Then, we call `totals`to get the current row values and general totals for the cart.

## How to make this feature work

By default, the cart and totals sync is disabled. To make it work, you just need to follow the steps described below:

1. Generate the Magento 2 API accesses. In our first tutorial, there is an [explanation on how to do this](../installation/magento.md).

2. Use the OAuth keys from the previous step to properly configure the `vue-storefront-api` data layer (it should've been installed locally on your computer / server). To do so, you need to modify the `conf/local.json` and paste the authorization data to the `magento2.api` section:

```json
"magento2": {
		"url": "http://magento2.demo-1.xyz.com",
		"imgUrl": "http://localhost:8080/media/catalog/product",
		"magentoUserName": "",
		"magentoUserPassword": "",
		"httpUserName": "",
		"httpUserPassword": "",
		"api": {
			"url": "http://demo-magento2.vuestorefront.io/rest",
			"consumerKey": "byv3730rhoulpopcq64don8ukb8lf2gq",
			"consumerSecret": "u9q4fcobv7vfx9td80oupa6uhexc27rb",
			"accessToken": "040xx3qy7s0j28o3q0exrfop579cy20m",
			"accessTokenSecret": "7qunl3p505rubmr7u1ijt7odyialnih9"
		}
	},
```

Please check the [`conf/default.json`](https://github.com/DivanteLtd/vue-storefront-api/blob/master/config/default.json) for the reference.

3. Move to your `vue-storefront` installation catalog and modify the `config/local.json`. You need to change the `cart` section to switch the `synchronize` and `synchronize_totals` flags to true:

```json
   "cart": {
      "synchronize": false,
      "synchronize_totals": false,
      "create_endpoint": "http://localhost:8080/api/cart/create?token={{token}}",
      "updateitem_endpoint": "http://localhost:8080/api/cart/update?token={{token}}&cartId={{cartId}}",
      "deleteitem_endpoint": "http://localhost:8080/api/cart/delete?token={{token}}&cartId={{cartId}}",
      "pull_endpoint": "http://localhost:8080/api/cart/pull?token={{token}}&cartId={{cartId}}",
      "totals_endpoint": "http://localhost:8080/api/cart/totals?token={{token}}&cartId={{cartId}}",
      "paymentmethods_endpoint": "http://localhost:8080/api/cart/payment-methods?token={{token}}&cartId={{cartId}}",
      "shippingmethods_endpoint": "http://localhost:8080/api/cart/shipping-methods?token={{token}}&cartId={{cartId}}",
      "shippinginfo_endpoint": "http://localhost:8080/api/cart/shipping-information?token={{token}}&cartId={{cartId}}",
      "collecttotals_endpoint": "http://localhost:8080/api/cart/collect-totals?token={{token}}&cartId={{cartId}}"
    },
```

Please check the [`conf/default.json`](https://github.com/DivanteLtd/vue-storefront/blob/1302ed84561a514beb8c35e45ae1d0aa4dc9f74a/config/default.json#L8) for a reference.

## Prices sync

The last missing block is the catalog prices sync. This can be very easily enabled using the feature called Dynamic Prices. Please check [Dynamic Prices howto](direct-prices-sync.md) to switch this feature on.

## Order sync

One of the cool features of Vue Storefront is queued order sync. This means whenever a user makes an order in the application, we store the order in the local browser cache (indexedDb instance) and send it to the server as soon as the Internet connection is available.

![Orders are stored locally before they're send to the server](../images/orders-collection.png)

On the server side, the `vue-storefront-api` is the first line that the order is crossing on its way back to Magento 2. No matter if the shopping cart was synchronized (as described above) or not, the order will be converted to a Magento 2 object. 

The server API stores the order in the queue where it's processed by the [`order_2_magento`](https://github.com/DivanteLtd/vue-storefront-api/blob/master/src/worker/order_to_magento2.js) worker process. We do support multiple types of orders: for guest users and logged in, with already synchronized carts or not, etc.

This process doesn't require much additional configuration:

1. You must have the Magento2 API access configures in the `config/local.json` file of `vue-storefront-api`
2. You must have the "Orders" section marked On within the "Permissions" section of Magento Integration ([see the previous tutorial for the reference on how to set it up](../installation/magento.md)).
3. After the configuration step You just run `yarn o2m` inside your `vue-storefront-api` directory.

![This is the output of o2m after successfull setup](../images/o2m-output.png)
