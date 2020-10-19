# Integrating CMS

::: warning Want to build an integration?
If you want to integrate any CMS platform with Vue Storefront please **contact the core team** first. We are eager to help you with building it and ensuring its high quality! Building the integration together with core team is the best way to keep its quality high and make it officially recommended once its done.
:::

## What for do we need it?

From time to time we want to present some additional data in our application - for example on our landing page or FAQ page. 
However, not always this data comes from commerce platform.
Sometimes we want to get data/content from external CMS platform like [Amplience](https://amplience.com/).

## What is needed
Here are the things that are expected from CMS integration:

### Configuration
This part is usually either using CMS JavaScript SDK under the hood or calls the API directly. Config should contain at least the API endpoint and credentials.

* a configuration via setup method for non-Nuxt apps

```typescript
// public API
setup(config)
```

* a Nuxt module that runs the setup method for Nuxt apps

```typescript
// public API
['@vue-storefront/{cms}/nuxt', config]
```

### Content fetching

Another (and the most important) thing that we need is a composable to fetch the content from our CMS. To create this composable you should use `useContentFactory` from Vue Storefront core.

```typescript
// integration
import { useContentFactory } from '@vue-storefront/core'

// CONTENT and CONTENT_SEARCH_PARAMS are your CMS-specific types, 
// we advise to have at least 'id' param for search
const useContent = useContentFactory<CONTENT, CONTENT_SEARCH_PARAMS>({
  // (params: CONTENT_SEARCH_PARAMS) => Promise<CONTENT>;
  search (params) { 
    // write your content fetching logic here
    return content
  }
}) 
```

The public API:

```typescript
const { search, content, loading, error } = useContent()
```

### Content rendering

Many CMS systems allow to control the page layout by returning a list of components as a JSON file. 
These components are then rendered in the application. 
The component that is mapping the content object into Vue components and renders them is called `RenderContent`.
It's created from `renderContentFactory` from Vue Storefront core.

So, what `renderContentFactory` does is rendering your content data into the Vue components.
To be precise - your data will be converted to the components *Array*. 

This factory requires special structure, and we have to provide it while using it.

```typescript
interface RenderComponent {
  componentName: string;
  props?: {};
}
```

To pass this data we can create special composable and use `extractContent` parameter.

```typescript
// integration
import { renderComponentFactory } from '@vue-storefront/core'

// CONTENT and CONTENT_SEARCH_PARAMS are your CMS-specific types, 
// we advise to have at least 'id' param for search
const RenderComponent = renderComponentFactory({
  // (extractContent: CONTENT) => { componentName, props }[]
  extractContent (content) { 
    // extract an array of { componentName: string, props: { name, value } } 
    // pairs and the factory will generate a component that will render these 
    // components based on the ones that are currently registered within application
    return components[]
  }
}) 
```

And the real life example.

```vue
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
  },
  setup() {
    const { search, content, loading, error } = useContent();
    // get data
    onSSR(async () {
      await search({ id: 'CONTENT_ID' })
    });
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

**Remember** to create and define the rendered components with several props that will be used in.
Instead of this you'll get an component registration error. 
More about: [here](https://vuejs.org/v2/guide/components-registration.html#Local-Registration).


