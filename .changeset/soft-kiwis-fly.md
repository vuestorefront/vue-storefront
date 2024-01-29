---
"@vue-storefront/multistore": patch
---

[FIXED] singleton cache issue, previously the cache was a singleton which could lead to unexpected behaviour when extension was used in different integrations in parallel. Now, the cache is being created during extension creation, what ensures proper cache behaviour.
