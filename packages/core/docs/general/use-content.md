# What is Use Content?

Use content is a set of tools that gives you an ability to retrieve data from any headless content management system (CMS).

## What for do we need it?

From time to time we want to present some additional data in our application - for example on our landing page or FAQ page. 
However, not always this data comes from commerce platform.
Sometimes we want to get data/content from external CMS platform like [Amplience](https://amplience.com/).

## What's included?

* [useContentFactory](#usecontentfactory) - retrieving content factory
* [renderContentFactory](#rendercontentfactory) - rendering content as a Vue node factory

## How to use it?

### `useContentFactory`

The `useContentFactory` is fully independent. To use it we have to create our own composable.

```typescript
import { useContentFactory } from '@vue-storefront/core';
import { UseContent } from '@vue-storefront/core';

const search = async (params: any) => await yourApiCallMethod(params)
export const useContent: (cacheId: string) => 
  UseContent<any, any> = useContentFactory<any, any>({ search });
```

Here we have access to the search param which can be assigned to our API call method/service.

We can use it like that:

```typescript
import { useContent } from 'path/to/your-module'

const { search } = useContent('test-id');
await search({ ...params });
```

If all goes well - with api request - that way we will get factory created object with our content.

The content data will be stored as a computed value, so we can reach for it like that:

```typescript
import { useContent } from 'path/to/your-module'
import { computed } from '@vue/composition-api';

const { value: contentGetter } = computed(() => useContent('test-id'));
return contentGetter.content.value;
```

Also, you have access to the `loading` and `error` values.

### `renderContentFactory`

What `renderContentFactory` does is rendering your content data to the Vue components. 
To be precise your data will be converted to the components *Array* wrapped by ths `render-content` component. 

This factory requires special structure, and we have to provide it before usage.

```typescript
interface RenderComponent {
  componentName: string;
  props?: {};
}
```

The content should be passed as a `content` property (prop), 
and it should be an *Array* of *Objects* with previously prepared structure: `RenderComponent[]`.

The real life example of script ...

```typescript
import Vue from 'vue'
import { renderContentFactory, RenderComponent } from '@vue-storefront/core';

export default Vue.extend({
  components: {
    RenderContent: renderContentFactory()
  },
  data: (): { content: RenderComponent[] } => {    
    content: [{ componentName: 'test-component', props: { title: 'title' } }],
  } 
})
```

... and the template implementation.

```html
<div>
    <render-content :content="content" />
</div>
```

**Remember** to create and define the rendered components with several props that will be used in.
Instead of this you'll get an component registration error. 
More about: [here](https://vuejs.org/v2/guide/components-registration.html#Local-Registration).


