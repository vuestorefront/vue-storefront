# Default Store Redirect

This module provides the option to force any requests without a storeCode to be redirected to the `defaultStoreCode`.

To enable this feature you must have the following configuration set in your `local.json`

```json
"appendDefaultStoreCode": true,
"storeViews": {
    "multistore": true,
    ...
},
```
Optionally, you can set `defaultStoreCode` to which storeCode you wish to be the default. If none is set, then this module will use the first storeCode in the list of `mapStoreUrlsFor`.


## Custom Logic

This module provides the hook `beforeRedirectToDefaultStore` which can be used to provide your own custom logic for determining which storeCode should be considered the default. Simply subscribe to this hook, modify the `storeCode` parameter as you see fit, and returned the modified `storeCode`.