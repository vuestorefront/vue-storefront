# Custom CMS routes

In fact we wan't to make use of the benefits of [single-file-components](https://vuejs.org/v2/guide/single-file-components.html) and [async-sfc's](https://vuejs.org/v2/guide/components-dynamic-async.html) in our CMS.

This means that there must be a rendered component registered to specific route and it's not possible to create them completely in a connected CMS on runtime. It's mainly because of the needed build of each component to make all functionallity like scoped css, code-splitteng and custom imports work.

## Add a custom cms page

### 01. Add a new single-file-component

Add a new single-file-component with a decent name in `theme/components/core/blocks/ICMAA/Cms/Pages/`.

It's recommended to implement the default `page` mixins to your new component to have default methods and default meta-data already applied. A sample components could look like:
```html
<template>
  <div id="cms-page" v-if="page">
    <ul>
      <li v-for="item in test" :key="item">
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<script>
import Page from 'icmaa-cms/mixins/Page'

export default {
  mixins: [ Page ],
  data () {
    return {
      dataType: 'yaml'
    }
  },
  computed: {
    test () {
      return this.content.test
    }
  }
}
</script>

<style lang="sass">
body {
  background: #f00
}
</style>
```

Now we need to add our new single-file-component on top of `theme/router/icmaa-cms/router.ts` like:

```javascript
const ServiceComponent = () => import(/* webpackChunkName: "vsf-icmaa-cms-page-custom-service" */ 'theme/components/core/blocks/ICMAA/Cms/Pages/Service.vue')
```

It's important to have a custom `webpackChunkName`, thats why we use a prefix like `vsf-icmaa-cms-page-custom-` for each new component.

### 02. Add a new route

To add a new route which is using our custom single-file-component, we need to specify all neccessary data to the `routes` array in `theme/router/icmaa-cms/router.ts` like:

```
{ name: 'service', path: '/:identifier', component: ServiceComponent }
```

A script in the parent class will transform this route a bit to give it some unique prefixes to prevent duplicated routes and a consistent name structure. Finally the route will be registered like:

```
{ name: 'icmaa-cms-custom-service', path: '/icmaa-cms-custom/service/:identifier', component: ServiceComponent }
```

## 03. Populate and use cms data

There are four options in format to add content data to your CMS page: `html`, `markdown`, `yaml` and `json`.
Dependent on what format your cms page content contains, you can populate your data in your component using the parent computed property `content` of the `Page` mixin. If you wan't to use a specific data type you must define the variable `dataType` like:

```javascript
export default {
  mixins: [ Page ],
  data () {
    return {
      dataType: 'yaml' // 'yaml' | 'json' | 'html' | 'markdown' - default: 'html'
    }
  }
}
```

If you use `dataType`  with `json` or `yaml` a object or an array is returned, for `html` it's a compiled string.

## 04. URL

The defined `identifier` in the CMS page stands for the URL path. So if you add `service` your custom cms page will be available at `/service` or `/de/service` etc.. With giving the CMS entry an `identifier` and `routeName` it can automatically connect this url to the specific router and single-page-component using our `icmaa-url` module.
