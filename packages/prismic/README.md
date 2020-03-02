# prismic

> Prismic library for Next

## Installation

With Yarn:
```bash
yarn add @vue-storefront/prismic
```

With NPM:
```bash
npm install --save @vue-storefront/prismic
```

## Setup library

```typescript
import { setup } from '@vue-storefront/prismic'

setup({
  endpoint: 'https://your-account.prismic.io/api/v2',
  apiOptions: {
    accessToken: 'Prismic_Access_Token'
  }
});
```

## Nuxt support

If you need to integrate Prismic with Nuxt, just simply provide setup file (that one above for example) into `nuxt.config.js` plugins section.

## Example usage

```html
<template>
  <div>
    <div v-for="page in pages" :key="getPageId(page)">
      <div v-for="(block, i) in getBlocks(page.data)" :key="i">
        <div v-html="block" />
      </div>
      <div v-for="(slice, i) in getSlices(page)" :key="`slice-${i}`">
        <p>slice #{{i+1}}</p>
        <div v-html="getBlocks(slice, 'primary')" />
        <div v-for="(item, j) in slice.items" :key="`slice-${i}-${j}`">
          <div v-for="(block, k) in getBlocks(item)" :key="`slice-block-${k}`">
            <div v-html="block" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import { computed } from '@vue/composition-api';
import { usePrismic, getPages, getBlocks, getSlices, getPageId } from '@vue-storefront/prismic';

export default {
  setup() {
    const { doc, search, loading, error } = usePrismic();
    const pages = computed(() => getPages(doc.value));

    search({
      at: {
        fragment: 'document.type',
        value: 'slices'
      }
    });

    return {
      pages,
      loading,
      error,
      getBlocks,
      getSlices,
      getPageId
    };
  }
};
</script>
```
