# `icmaa-config` module

Load config files per store view using a custom `configProvider` to make the config files more readable for a big amount of store view.

This method searches in the config folder for files like `local-imp-storeview-de.json` and extends the specific store view setting of the store by the content of this file.

The files are structured similar to the `npm-config` module, like:
```
local-${mandant}-storeview-${store-code}.json
```

## Installation

First enable `server.dynamicConfigReload` in your settings.

For `v1.11.0` and above:
*  Add the custom `configProvider` to the `src/ modules/server.ts` file like:
   ```javascript
   export const configProvider = require('icmaa-config      configProvider')
   ```

For `v1.10.x`:  
* Add the custom `configProvider` to the `src/server/index.js` file like:
  ```javascript
  module.exports.registerUserServerRoutes = require('icmaa-config/    configProvider')
  ```

## Configs

...

## Todo

[ ] ...
