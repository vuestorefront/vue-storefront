# useContent composable

`useContent` composition API function allows loading of the CMS pages. This function returns the following values:

- `search` - the main function that is used to fetch a cms page from the eCommerce platform and populate the `content` object with the result. Every time you invoke this function API request is made. This method accepts a single `slug` string.
- `content: Content[]` - a main data object that contains an array of page data fetched by `loadPage` method.
```typescript
export type Content = {
  id: string;
  name: string;
  body: string;
  handle: string;
}
```
- `loading` - a reactive object containing information about the loading state of your `loadPage` method.

## contentGetters

- `getFiltered` - Retrieve the single page fetch by handle from Shopify store 
- `getContents` - Return the list of pages of the Shopify store.

## Examples

Fetch a single page by the handle of the shop.

```javascript
import { onSSR } from '@vue-storefront/core';
import { useContent, contentGetters } from '@vue-storefront/shopify';

export default {
  setup(props, context) {
    const { search, content } = useContent();
    const { slug } = context.root.$route.params;

    onSSR(async () => {
      await search(slug);
    });

    const page = computed(() => contentGetters.getFiltered(content.value));

    return {
      page
    };
  }
};
```

List of the shop's pages.

```javascript

    const { pages, content } = useContent();
    
    onSSR(async () => {
      await pages();
    });

    const cmsPages = computed(() => contentGetters.getContents(content.value));
    return {
      cmsPages
    };

```
