# Migration guide 2.1.0-rc.1

This guide contains a list of changes, in order to upgrade your VSF next to the 2.1.0-rc.1 version.

## The general overview

In general, besides the smaller changes, we totally have changed the way of accessing configuration or API functions.
Always, instead of using configuration or networking stored in the global objects, we recommend to use context, provided by us.

Each time you want to access an integration stuff, such as network client, configuration or API functions please use `useVSFContext`

```js
import { useVSFContext } from '@vue-storefront/core';

export default {
  setup () {
    const { $integrationTag } = useVSFContext();
  }
}

```

For more information, please read the section [Application Context](/general/context) in the general docs.

## List of changes for certain users

- [Changes for integrators](./integrators.md)
- [Changes for projects](./projects.md)


## Common problems

### Composition API already installed

```
[vue-composition-api] already installed. Vue.use(VueCompositionAPI) should be called only once.
```

**Solution**: Please make sure that you have everywhere the same version of vue composition api as the one we use in the core

### Using Composition API before is being installed

```
Uncaught Error: [vue-composition-api] must call Vue.use(plugin) before using any function.
```
**Solution**: if you are using compositon API (eg. `ref`) above the component, please make sure that you have `vue-composition-api` installed, or move these calls inside of the `setup` function.

### Some of our package doesn't work, the context doesn't return anything or has missing data

**Solution**: Please make sure that you put package in the raw sources section, and if the integration has nuxt module and extend an existing one, should be aded before our core nuxt module and the one with integration

```js
{
  ['@vue-storefront/some-new-integration/nuxt', {}], // 2
  ['@vue-storefront/nuxt', {
    coreDevelopment: true,
    useRawSource: {
      dev: [
        '@vue-storefront/core'
        '@vue-storefront/other-package' // 1
      ],
      prod: [
        '@vue-storefront/core',
        '@vue-storefront/other-package' // 1
      ]
    }
  }],
  ['@vue-storefront/some-integration/nuxt', {}]
}
```
