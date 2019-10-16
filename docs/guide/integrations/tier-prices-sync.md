# Tier prices sync with Magento

This feature allows you to show the user a final price, including tier prices from Magento. It supports a simple, downloadable, configurable bundle and group products.

To enable tier prices, change the following lines in the

```json
  "usePriceTiers": true
```

To use this feature you should also modify `config/local.json` within your `vue-storefront-api` installation:

```json
  "usePriceTiers": true
```
