# `icmaa-user` module

* Extend the `user` module and add `customercluster` store.
* Add Facebook login action to store and configs to `local.json`.
* Add debug toolbar to quickly switch the cluster for debugging.

## Configs

You need to add the following config to the `config/local.json`:

```
  ...
  "icmaa_cluster": {
    "noClusterValue": "4352"  # The attribute-value for "No cluster"
  },
  "icmaa_facebook": {
    "endpoint": "/api/ext/icmaa-facebook",
    "login": {
      "enabled": true,
      "appId": "XXXXXXXXXXXXXXX",
      "version": "v5.0",
      "scope": "email,user_birthday,user_gender"
    }
  },
  ...
```

## Debugging toolbar

To include the toolbar on a page you need it, just include it as a component like:

```
<template>
  <div>
    ...
    <cluster-debug />
  </div>
</template>

<script>
...
import ClusterDebug from 'icmaa-user/components/Cluster/Debug'

export default {
  ...
  components: {
    ClusterDebug
  },
  ...
}
</script>
```

## Todo

[ ] ...
