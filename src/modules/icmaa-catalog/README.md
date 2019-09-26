# `icmaa-catalog` module

Add our custom functionality for the original `catalog` and `catalog-next` module.

## Config

You can prefetch attribute option values and labels for specific attributes on several pages by adding them to `prefetchAttributes` value in configs. This way you can show option labels and values without the need to fetch them each time.
```
  ...
  "icmaa_catalog": {
    "entities": {
      "product": {
        "prefetchAttributes": [
          "band", "brand", ...
        ]
      }
    }
  }
```

## Todo

[ ] ...
