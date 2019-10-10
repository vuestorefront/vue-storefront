# `icmaa-user` module

Extend the `user` module and add `customercluster` store.

We also added a debug toolbar to quickly switch the cluster for debugging.

## Configs

You need to add the following config to the `config/local.json`:

```
  ...
  "icmaa_cluster": {
    "noClusterValue": "4352"  # The attribute-value for "No cluster"
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
