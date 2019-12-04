# `icmaa-revrecommendationsiew` module

Add a service to fetch custom product recommendations, based on defined rulesets.

## Configs

We have specific rule sets for each block, for example: `crosssell`, `upsell`.
This rule sets are defined in a CMS block in JSON format with the identifier `recommendations`.

The format of the string should be like:
```
{
  "crosssell": {
    "default": {
      "continue": "true",
      "then": {
        "category_ids": 3278,
        "department": "current"
      }
    },
    "boys": {
      "continue": "true",
      "if": { "gender": 9 },
      "then": { "category_ids": 780 }
    },
    ...
    "department_media": {
      "if": { "department": 853 },
      "then": {
        "category_ids": 780,
        "or": {
          "band": "current",
          "customercluster": "current"
        }
      }
    },
    ...
    "band_type_top": {
      "if": {
        "band": "not null",
        "type_top": "not null"
      },
      "then": {
        "category_ids": 1601,
        "department": [5, 6],
        "type_shoes": "not null"
      }
    }
  }
}
```

## Todo

[ ] ...
