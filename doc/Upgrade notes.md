# Upgrade notes

We're trying to keep the upgrade process as easy as it's possible. Unfortunately sometimes manual code changes are required. Before pulling out the latest version, please take a look at the upgrade notes below:.

## 1.0RC -> 1.0RC-2 ([release notes](https://github.com/DivanteLtd/vue-storefront/releases/tag/v1.0.0-rc.2))
This release brings some cool new features (Magento 1.x support, Magento 2 external checkout, My Orders, Discount codes) together with some minor refactors.

Unfortunately with the refactors there comes two manual changes that need to be applied to Your custom themes after the update. Here You can check [how did we migrated our own default_m1 theme to RC-2](https://github.com/DivanteLtd/vue-storefront/commit/111519c04acec272657e7eefec7ea8405da95f13).

1. We've changed `ColorButton`, `SizeButton`, `PriceButton` in the `core` to `ColorSelector`, `SizeSelector`, `PriceSelector` and added the `GenericSelector` for all other attribute types. Because of this change, the `coreComponent('ColorButton')` must be changed to `coreComponent('ColorSelector')` etc. 

2. We added the Vuex Stores extensibility to the themes. If You're getting the following build error:

```
ERROR in ./core/store/index.js
Module not found: Error: Can't resolve 'theme/store' in '***/vue-storefront/core/store' 
```

It means, that You need to copy the [template store](https://github.com/DivanteLtd/vue-storefront/blob/master/src/themes/default/store/index.js) to: `<Your custom theme folder>/store`.

