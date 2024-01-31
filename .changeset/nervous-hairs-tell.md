---
"@vue-storefront/sdk": patch
---

[CHANGED] 
* Previously, developers trying to create the sdkConfig object received very few suggestions, either while passing the module configuration object, or while working with the extensions. They were also able to create overrides with signatures different from the original methods which we strongly advise against. We adjusted the types to make the process of creating the sdkConfig object easier and more intuitive. We also added more suggestions to the extensions and options objects.
