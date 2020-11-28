# `useContent`

`useContent` is typically a composable used for a CMS integration and is user together with `<RenderContent>` component.

You can use them to
- fetch a single CMS content entity or a list
- render Vue Components from your project based on the fetched content


## How to use it in your project?

```html
<template>
  <div v-if="loading">Loading content...</div>
  <div v-if="error">Something is wrong!</div>
  <RenderContent v-if="content" :content="content" />
</template>

<script>
import { onSSR } from '@vue-storefront/core'
import { useContent, RenderContent } from '{INTEGRATION}'
// These are the components that will be rendered by <RenderContent>.
import CMSBanner from '~/components/CMSBanner'
import CMSHero from '~/components/CMSHero'

export default {
  components: {
    RenderContent,
    CMSBanner,
    CMSHero
  }
  setup( ) {
    const { search, content, loading, error } = useContent('<UNIQUE_ID>')

    onSSR(async () {
      await search({ id: 'CONTENT_ID' })
    })

    return {
      content,
      loading,
      error
    }
  }
}
</script>
```