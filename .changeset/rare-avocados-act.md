---
"@vue-storefront/rollup-config": patch
---

- [CHANGED] Always clear rollup-plugin-typescript2 cache when building. If you built once with an error, you'd always get an error even if you fixed the underlying code issue that caused the build to fail. This could be fixed by removing node_modules/.cache, but it's better to never create the cache at all.
