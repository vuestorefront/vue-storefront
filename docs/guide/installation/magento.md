# Integration with Magento 2

## Integrating Magento2 with your local instance

As a first step, you need to to install [mage2vuestorefront ](https://github.com/DivanteLtd/mage2vuestorefront):

```bash
git clone https://github.com/DivanteLtd/mage2vuestorefront.git mage2vs
cd mage2vs/src
yarn install
```

The tool is using Magento2 API via OAuth authorization, so you need to prepare Magento Integration access at first. Go to your Magento2 admin panel and click: _System -> Integrations_

![Magento Admin Panel](/docs/magento_1.png)

Then click _Add new integration_ and just fill:

- name (whatever)
- your password to confirm the changes,
- check Catalog, Sales, My Account and Carts on API permissions tab — save

![Magento API](/docs/magento_2.png)

In the result you’ll click _Activate_ and get some oauth access tokens:

![Magento tokens](/docs/magento_3.png)

Now please edit the `src/config.js` file in your `mage2vuestorefront` directory to set the following section:

```js
magento: {
  url: process.env.MAGENTO_URL || 'http://magento2.demo-1.divante.pl/rest/',
  consumerKey: process.env.MAGENTO_CONSUMER_KEY || 'alva6h6hku9qxrpfe02c2jalopx7od1q',
  consumerSecret: process.env.MAGENTO_CONSUMER_SECRET || '9tgfpgoojlx9tfy21b8kw7ssfu2aynpm',
  accessToken: process.env.MAGENTO_ACCESS_TOKEN || 'rw5w0si9imbu45h3m9hkyrfr4gjina8q',
  accessTokenSecret: process.env.MAGENTO_ACCESS_TOKEN_SECRET || '00y9dl4vpxgcef3gn5mntbxtylowjcc9',
},
```

As you can see, you can override the defaults by ENV variables as well.

The rest of config.js entries points out to your `vue-storefront-api` based Docker and Redis instances which are required by `mage2nosql` to work.

To import all the Products, Categories and other important stuff to your Elastic Search instance you should run the following commands (the sequence of commands is important  -  as for example `node cli.js categories` populates Redis cache for the further use of `node cli.js` products and so on)

```bash
node cli.js taxrule
node cli.js attributes
node cli.js categories
node cli.js productcategories
node cli.js products
```

It’s safe to run these commands over and over as they’re doing `upsert` operation  - so inserts or updates the existing records.

`cli.js` has a lot of other modes to be run in. Dynamic changes, queue support etc. You may experiment with them, but remember  -  the basic sequence for syncing the whole Magento2 database is like just shown.

## Synchronizing orders and Magento images

As you should have the products and categories already synchronized you may want to send some orders back to Magento or synchronize the shopping carts in the real time.

`vue-storefront-api` is responsible for this write access to Magento. You may want just edit your `conf/local.json` within `vue-storefront-api` directory to set the OAuth Magento API access (`magento2` section).

To allow `vue-storefront-api` to resize your Magento’s images, please edit the `imgUrl` property under `magento2` section and add your Magento’s domain to `imageable` -> `whitelist`.

:::tip NOTE
After changing the config files you need to restart `yarn dev`
:::

After setting up the Magento access you just need to run the Order2Magento worker which works on Redis based queue to process all the orders made by users:

```
yarn o2m
```

The code of this script is [located here](https://github.com/DivanteLtd/vue-storefront-api/blob/master/src/worker/order_to_magento2.js) -  so you can easily check how it’s working.

## Synchronizing shopping carts

By default shopping carts are not synchronized in the real time  -  just after the order is placed, Magento2 cart is created etc.

This was limiting behavior because you need to keep the user cart most current all the time to get Magento2 shopping cart promotion rules into the action .

We have option for that! If you have Magento2 API configured within the `vue-storefront-api` you just need to go to `vue-storefront/conf/local.json` and add

```js
synchronize: true;
```

to `cart` section. Please check the [default config for reference](https://github.com/DivanteLtd/vue-storefront/blob/193cf44a6e936136fc19e22b45fe8dbc4b33f844/config/default.json#L8).
