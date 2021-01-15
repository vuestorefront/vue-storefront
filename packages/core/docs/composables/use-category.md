# `useCategory`

## When to use it?

Use `useCategory` when you need to fetch a list of categories. A common usage scenario for this composable is navigation.

## How to use it in your project?

```js
import { useCategory } from '{INTEGRATION}'
import { onSSR } from '@vue-storefront/core'

export default {
  setup () {
    const { categories, search, loading } = useCategory('<UNIQUE_ID>')
    
    onSSR(async () => {
      await search({ slug: 't-shirts' }) 
    })

    return {
      categories,
      loading,
      error
    }
  }
}
```