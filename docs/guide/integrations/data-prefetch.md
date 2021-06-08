# Data Prefetch

To prefetch data in vsf you can use [instant-prefetch](https://github.com/gibkigonzo/instant-prefetch) which is an extension of [instant.page](https://instant.page/) library. In [instant.page](https://instant.page/) you can prefetch html when user has mouse over link. This allows to faster page load. However in vsf after first load we have SPA app. In that case we shouldn't be loading all html for next page because we already have most of resources. So [instant-prefetch](https://github.com/gibkigonzo/instant-prefetch) has same behavior as [instant.page](https://instant.page/) but with one major difference. We can pass callback for each mouseover event and create custom action for it, more info on gh page [instant-prefetch](https://github.com/gibkigonzo/instant-prefetch).

We can:
- fetch data for products, category, cms_pages etc.
- fetch scripts next page script (if we didn't prefetch it by initial load)
- trigger GTM events

Here is example of module that makes fetch for product data
```javascript
import { StorefrontModule } from '@vue-storefront/core/lib/modules'
import { isServer } from '@vue-storefront/core/helpers'
import { init } from 'instant-prefetch'
import queryString from 'query-string'

export const InstantPrefetch: StorefrontModule = async function ({ store }) {
  // we don't need this code for ssr
  if (isServer) return

  init(
    (linkElement) => {
      // get url in same format as is stored by mapFallback action
      const productUrl = queryString.parseUrl(linkElement.href.replace(new RegExp(`^${window.location.origin}`, 'g'), '')).url
      // get product page parameters
      const urlData = store.state.url.dispatcherMap[productUrl]
      if (urlData && Object.keys(urlData).length && urlData.name.endsWith('-product')) {
        // fetch product data
        store.dispatch('product/loadProduct', urlData.params)
        // you can also fetch other things like related products which are lazy loaded on product page in default theme
      }
    },
    {
      allowQueryString: true
    }
  )
}

```
