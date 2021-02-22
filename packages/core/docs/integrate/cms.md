# Integrating CMS

::: warning Want to build an integration?
If you want to integrate with Vue Storefront, please **contact the core team on our [slack](https://slack.vuestorefront.io)** first. We are eager to help you with building it and ensuring its high quality! Building the integration together with the core team is the best way to keep its quality high and make it officially recommended once it's done.
:::

## What is needed

Here are the things that are expected from CMS integration:

### Configuration

This part is usually either using CMS JavaScript SDK under the hood or calls the API directly. Config should contain at least the API endpoint and credentials.

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

To create this composable you should use `useContentFactory` from Vue Storefront core.

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

Many CMS systems allow to control the page layout by returning a list of components as a JSON file. These components are then rendered in the applicatio. The component that is mapping the `content` object into Vue components and renders them is called `RenderContent`.

```html
<!-- public API -->
<RenderContent :content="content">
```

To build this component you just have to use our `renderComponentFactory`.

```ts
// integration
import { renderComponentFactory } from '@vue-storefront/core'

// CONTENT and CONTENT_SEARCH_PARAMS are your CMS-specific types, we advise to have at least 'id' param for search
const RenderComponent = renderComponentFactory({
  // (extractContent: CONTENT) => { componentName, props }[]
  extractContent (content) { 
    // extract an array of { componentName: string, props: { name, value } } pairs and the factory will generate a component that will render these components based on the ones that are currently registered within application
    return components[]
  }
}) 
```
Under the hood the `RenderComponent` is rendering components using Vue dynamic component feature:

```html
<!-- core, inside renderComponentFactory -->
<component v-for="component in components" is="component.componentName" content="props" />
```

## Usage example in real app

```html
<template>
  <div v-if="loading">Loading content...</div>
  <div v-if="error">Something is wrong!</div>
  <RenderContent v-if="content" :content="content" />
</template>

<script>
import { onSSR } from '@vue-storefront/core'
import { useContent, RenderContent } from '@vue-storefront/my-super-cms'
// These are the components that will be rendered by RenderContent.
// `extractContent` should return [{ componentName: 'CMSBanner', props: { ... }}, { componentName: 'CMSHero', props: { ... }}]
import { CMSBanner, CMSHero } from '~/components'

export default {
  components: {
    RenderContent,
    CMSBanner,
    CMSHero
  }
  setup( ) {
    const { search, content, loading, error } = useContent()

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