# `useProduct`

## When to use it?

Use `useProduct` composable when you want to fetch a single product (or list of products) based on their unique attributes that doesn't have to be filtered. This composable is **not** exposing any advanced filtering functionality. A common usage scenario for `useProduct` is Product Details Page.

## How to use it in your project?

```js
import { useProduct } from '{INTEGRATION}'
import { onSSR } from '@vue-storefront/core'

export default {
  setup () {
    const { 
      products, 
      totalProducts, 
      search, 
      loading 
    } = useProduct('unique-identifier')
    
    onSSR(async () => {
      await search({ slug: 'super-t-shirt' }) 
    })

    return {
      products,
      totalProducts,
      loading
    }
  }
}
```