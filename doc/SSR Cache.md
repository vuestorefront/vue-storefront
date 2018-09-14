# SSR Cache

Vue Storefront generates the Server Side rendered pages to improve the SEO results. In the latest version of Vue Storefront we've added the Output cache option (disabled by default) to improve the performance.

The output cache is set by the following `config/local.json` variables:

```json
    "server": {
      "host": "localhost",
      "port": 3000,
      "protocol": "http",
      "api": "api",
      "useOutputCacheTagging": true,
      "useOutputCache": true,
      "outputCacheDefaultTtl": 86400
    },
    "redis": {
      "host": "localhost",
      "port": 6379,
      "db": 0
    },  
```

## Dynamic tags

The dynamic tags config uption:  `useOutputCacheTaging` - if set to true, Vue Storefront is generating the special HTTP Header `X-VS-Cache-Tags`
```js
        res.setHeader('X-VS-Cache-Tags', cacheTags)
```

Cache tags are assigned regarding the products and categories which are used on the specific page. Typical `X-VS-Cache-Tags` tag looks like this:
```
X-VS-Cache-Tags: P1852 P198 C20
```

The tags can be used to invalidate the Varnish cache if You're using it. [Read more on that](https://www.drupal.org/docs/8/api/cache-api/cache-tags-varnish).

## Redis

If both `useOutputCache` and `useOutputCacheTagging` options are set to `true` - Vue Storefront is using Output Cache stored in Redis (configured in the `redis` section of the config file). Cache is tagged with Dynamic tags and can be invalidated using special webhook:

Example call to clear all pages containing specific product and category:
`curl http://localhost:3000/invalidate?tag=P1852,C20`

Example call to clear all product, category and home pages:
`curl http://localhost:3000/invalidate?tag=product,category,home`

**WARNING:**
We strongly recommend You to NOT USE Output cache in the development mode. By using it You won't be able to refresh the UI changes after modyfing the Vue components etc.

**Cache invalidation:** Recent version of [mage2vuestorefront](https://github.com/DivanteLtd/mage2vuestorefront) do support output cache invalidation. Output cache is being tagged with the product and categories id (products and categories used on specific page). Mage2vuestorefront can invalidate cache of product and category pages if You set the following ENV variables:

```bash
export VS_INVALIDATE_CACHE_URL=http://localhost:3000/invalidate?tag=
export VS_INVALIDATE_CACHE=1
```
