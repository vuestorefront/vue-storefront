# Integrating CMS platform

::: warning Want to build an integration?
If you want to integrate with Vue Storefront, don't hesitate to get in touch with the core team on our [Discord](https://discord.vuestorefront.io/) server. We are eager to help you to ensure its high quality and maybe even officially recommend it 😉
:::

## What is needed

Here are the things that are expected from CMS integration:

### Configuration

This part is usually either using CMS JavaScript SDK under the hood or calls the API directly. The configuration should contain at least the API endpoint and credentials.

- a configuration via `setup` method for non-Nuxt apps
```js
// public API
setup(config)
```
- a Nuxt module that runs the `setup` method for Nuxt apps
```js
// public API
['@vue-storefront/{cms}/nuxt', config]
```

### Content fetching

Another (and the most important) thing that we need is a composable to fetch the content from our CMS.

```js
// public API
const { search, content, loading, error } = useContent()
```

To create this composable, you should use `useContentFactory` from Vue Storefront core.

```ts
// integration
import { useContentFactory } from '@vue-storefront/core'

// CONTENT and CONTENT_SEARCH_PARAMS are your CMS-specific types, we advise to have at least 'id' param for search
const useContent = useContentFactory<CONTENT, CONTENT_SEARCH_PARAMS>({
  // (params: CONTENT_SEARCH_PARAMS) => Promise<CONTENT>;
  search (params) { 
    // write your content fetching logic here
    return content
  }
}) 
```
The factory will output a composable fulfilling our interfaces. That's all you have to write in terms of content fetching.

### Content rendering (optional)

Many CMS systems allow controlling the page layout by returning a list of components as a JSON file. These components are then rendered in the application. The component that is mapping the `content` object into Vue components and renders them is called `RenderContent`.

```html
<RenderContent :content="content">
```

Now you need to prepare the particular structure for your components. Create the `extractComponents` function that will filter or modify all the metadata and return the component name along with props. Follow the example.   

```typescript
function extractComponents(response: ResponseFromYourCMS) {
  // filter or modify your response if needed
  return {
    componentName: string
    props: {}
  }[]
}
```

Pass it to the `RenderContent` component as a `content` prop. To register components, use computed value.

```vue
<!-- inside the RenderContent.vue component -->
<component v-for="component in components" :key="index" is="component.componentName" v-bind="component.props" />

<script>
export default ({
  name: 'RenderContent',
  props: {
    content: {
      type: Array,
    },
  },
  computed: {
    components() {
      return extractComponents(this.content)
    },
  },
})
</script>
```

Inside your application, you'll also need to register the UI components 
to render.

## Usage example in the real application

```html
<template>
  <div v-if="loading">Loading content...</div>
  <div v-if="error">Something is wrong!</div>
  <RenderContent v-if="content" :content="content" />
</template>

<script>
import { onSSR } from '@vue-storefront/core'
import { useContent, RenderContent } from '@vue-storefront/my-super-cms'
// These are the components that will be rendered by RenderContent
import { CMSBanner, CMSHero } from '~/components'

export default {
  components: {
    RenderContent,
    CMSBanner,
    CMSHero
  }
  setup( ) {
    const { search, content, loading, error } = useContent('unique-id')
    // fetch data
    onSSR(async () {
      await search({ id: 'CONTENT_ID' })
    })
    // return data
    return {
      content,
      loading,
      error
    }
  }
}
</script>
```
