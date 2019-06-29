# `icmaa-cms` module

Load CMS blocks from API and insert them into state or as component.

## Configs

* Run `yarn` to install modules dependencies: `axios`.  
  They are defined in templates `package.json`.

* Add the following API endpoint to `config/local.json`:
  ```
  "icmaa_cms": {
    "endpoint": "/api/ext/icmaa-cms/by-uid"
  }
  ```

## Todo

[ ] Add caching  
[ ] Prevent multiple requests to API when item is already loading
