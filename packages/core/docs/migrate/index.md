# Migration guide

This guide contains a list of changes, in order to upgrade your VSF next to the RC version.

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

- [Changes for integrators](/migrate/integrators)
- [Changes for projects](/migrate/projects)
