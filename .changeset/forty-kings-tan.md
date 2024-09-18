---
"@vue-storefront/sdk": patch
---

[FIXED] Headers with same name will now have their values merged using the ";' delimiter, rather than ",". This is seen when middleware and defaultRequestConfig set the same header - e.g. `Cookie`. 

After this change, `Cookie: vsf-locale=en` + `Cookie: custom-cookie=123` will result in `Cookie: vsf-locale=en; custom-cookie=123`, rather than being wrongly separated by `,`.
