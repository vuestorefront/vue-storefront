# `icmaa-cdn` module

Load custom image provider to support external CDN services.

## Configs

* Run `yarn` to install modules dependencies.  
  They are defined in templates `package.json`.

* `config.images.useExactUrlsNoProxy` must be `true` / enabled 

* Add the following configs to your `config/local.json`:
  ```
  "images": {
    "useExactUrlsNoProxy": true
  },
  "icmaa_cdn": {
    "provider": "scalecommerce",
    "scalecommerce": {
      "baseUrl": "https://www.base-url.com/",
      "quality": 85
    }
  }
  ```

## Add a new provider

If you wan't to add another CDN provider, you can add a new modules classes inside the `provider/NewProvider.ts`.

You also need to add the dynamic import variable to the `providers` array in the `index.ts` like:  
`newprovider: () => import(/* webpackChunkName: "vsf-icmaa-cdn-newprovider" */ './provider/NewProvider')`

Then add your desired configs under the `icmaa_cdn` configs path.

## Todo

[ ] ...
