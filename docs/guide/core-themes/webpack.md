# Working with Webpack

To make Vue Storefront fast and developer-friendly, we use webpack under the hood. We need it to transpile assets, handle `.vue` files, process all styles, and make our code a little more maintainable with linting provided by eslint. With that, you don't need to worry about configuring it by hand to start working on Vue Storefront or to build your own theme for it. However, when you want to tweak it to your special needs, there is also a possibility to do that with extendable webpack configuration for each theme.

## Core webpack build

All build scripts used by the core of Vue Storefront are available in `core/build` directory. If you want to improve our build or add support for new cases, you will probably only need to change files there and sometimes update `package.json`.

Base config for client and server is set up in `webpack.base.config.js`. This configuration is then merged with specific client and server configs in `webpack.client.config.js` and `webpack.server.config.js`.

For development mode (`yarn dev`) `dev-server.js` file is used to run previously mentioned config files (`webpack.client.config.js`, `webpack.server.config.js`) with custom config provided by the theme. We use `webpack-dev-middleware` and `webpack-hot-middleware` to make website development as fast and as easy as possible.

In `vue-loader.config.js` the whole configuration for `vue-loader` is stored. If there is a need to change style processing for single-file components, you can set it up in this file (if you want to extend the Vue Storefront core).

To build a production version of Vue Storefront `webpack.prod.client.config.js` and `webpack.prod.server.config.js` are used with a `build` script. In these files, our base configuration is merged with theme-specific extended config.

## Extending core build in themes

Vue Storefront follows technique popularized by [next.js](https://github.com/zeit/next.js/) and [Nuxt](https://nuxtjs.org/) for extending webpack config. For each theme, you can configure the `webpack.config.js` file that will allow you to have access to base configuration and customize it for your needs without changing core build files.


### Example

Below is a simple example that adds `webpack-bundle-analyzer` to check generated webpack bundles. In addition to analyzer, `json5-loader` is used to handle JSON5 files `json5-loader` in the project.

```js
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;

module.exports = function(config, { isClient, isDev }) {
  let configLoaders;
  if (isClient) {
    configLoaders = config.module.rules;
    config.plugins.push(
      new BundleAnalyzerPlugin({
        openAnalyzer: false,
        statsFilename: 'test',
        generateStatsFile: true,
        analyzerMode: 'static',
      }),
    );
  } else {
    configLoaders = config.module.rules;
  }
  configLoaders.push({
    test: /\.json5$/,
    loader: 'json5-loader',
  });
  return config;
};
```

This file should export a function that returns a complete configuration.
This function is executed with two arguments. First is the complete core Vue Storefront webpack configuration. Second is an object that has properties: `isClient` and `isDev`.

Option `isClient` indicates that the configuration is for client bundle.

Option `isDev` is set to `true` if Vue Storefront runs in development mode.

In the case of client build (`isClient == true`), config argument is an array with two elements. The first array element is the client configuration and the second one is used to generate a service worker file.

For server build (`isClient == false`), config argument is a standard webpack configuration object.

All loaders and plugins used in extended configuration will be fetched from the theme `node_modules` directory, so make sure you have it saved in the theme `package.json` file.
