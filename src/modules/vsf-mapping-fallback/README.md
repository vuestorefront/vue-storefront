# vsf-mapping-fallback

Modular mapping fallback for Vue Storefront.

https://docs.vuestorefront.io/guide/basics/url.html#how-to-customize-the-mapping-mechanism

## Usage

Clone this repository to `src/modules/vsf-mapping-fallback` and use it like below

```js
import { extendMappingFallback, Payload } from 'src/modules/vsf-mapping-fallback'
import { forProduct, forCategory, forStoryblok, tap } from 'src/modules/vsf-mapping-fallback/builtin'

export const forDemo = async (context, { url, params }: Payload) => {
  if (url === 'demo') {
    return {
      name: 'category',
      redirect: '/posters'
    }
  }
}

extendMappingFallback(
  forDemo, forProduct, forCategory, forStoryblok, tap
)
```


## Builtins

### `forProduct`

The default mappingFallback for products

### `forCategory`

The default mappingFallback for categories

### `forStoryblok`

Mapper to be used with [vsf-storyblok-sync](https://github.com/kodbruket/vsf-storyblok-sync)

### `tap`

Prints payload to console
