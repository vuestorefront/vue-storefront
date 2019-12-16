# `icmaa-url` module

Set mappings for specific routes to enable custom routes and urls.
Also add an auto-redirect to default stores for url's without a store-code in it.

## Configs

You can add your mappings to the `config/local.json`:

```
  …
  "icmaa_url": [
    {
      "request_path": "new",
      "name": "category",
      "params": {
        "slug": "new"
      }
    },
    {
      "request_path": "streetwear",
      "name": "icmaa-category-list",
      "params": {
        "parentCategoryId": 14
      }
    },
    {
      "request_path": "merchandise",
      "name": "icmaa-category-list",
      "params": {
        "parentCategoryId": 16,
        "depth": 2
      }
    }
  ],
```

## Todo

[ ] Make config via `icmaa-cms` available
