# `icmaa-google-tag-manager` module

This module contains all functionality for our Google-Tag-Manager (GTM) implementation.

The GTM is by default disabled until the cookie-notice is accepted.  
This can be disabled by the config value: `forceCookieAccept`.

## Config

```
{
  ...
  "googleTagManager": {
    "id": "XXX-XXXXXX",
    "debug": false,
    "forceCookieAccept": true,
    "productAttributes": [
      { "field": "id" },
      { "field": "name" },
      ...
    ]
  }
  ...
}
```

## Todo

...

