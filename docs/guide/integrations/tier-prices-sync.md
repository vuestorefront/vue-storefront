# Tier prices sync with Magento

This feature allows to show user a final price including tier prices from Magento. It supports simple, downloadable, configurable bundle and group products.

To enable tier prices do change the following lines in the

```json
  "usePriceTiers": true
```

To use this feature you should also modify `config/local.json` within your `vue-storefront-api` installation:

```json
  "usePriceTiers": true
```
