---
"@vue-storefront/middleware": minor
---

It is now possible to add namespaced extensions to integrations. Namespaced extensions are registered under `/{integration-name}/{extension-name}` extension of integration's namespace in opposition to non-namespaced extensions which are registered under `/{integration-name}` integration's namespace. Default value is `false`. Extensions without a namespace can potentially override existing endpoints, so it's recommended to use namespaced extensions whenever possible.

Read more about extensions in our [docs](https://docs.vuestorefront.io/middleware/guides/extensions).




