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

### Filters

There are some new filter options to setup our filter logic. To find out what they are doing, look at the categore sidebar component in the theme.
```
...
"systemFilterNames": ["sort", "pagesize"],
  "defaultFilters": [
    "price",
    "size",
    "type_top",
    "type_shoes_height",
    "type_top_sleeve",
    ...
  ],
  "filterTree": {
    "band": [], "brand": [],
    "type_top": ["type_top_sleeve", "type_top_printtyp", "type_top_jackets", "type_top_cut", "type_jackets_lenght", "type_shirt_pattern"],
    ...
  },
  "submenuFilters": ["band", "brand", ... ],
  "singleOptionFilters": ["is_in_sale", "preorder"],
  "filterTypeMapping": {
    "color": ["color"],
    "gender": ["gender"],
    "price": ["price"],
    "sale": ["is_in_sale"],
    "list": ["type_top", "type_shoes_height", ... ],
    "searchableList": ["band", "brand"]
  },
```

## Todo

[ ] ...
