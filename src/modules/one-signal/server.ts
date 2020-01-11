import { serverHooks } from '@vue-storefront/core/server/hooks';
let config = require('config');
const path = require('path');
const rootPath = require('app-root-path').path;
const express = require('express');
const resolve = file => path.resolve(rootPath, file);
const ms = require('ms')
const isProd = process.env.NODE_ENV === 'production';

const serve = (path, cache, options?) => express.static(resolve(path), Object.assign({
  fallthrough: false,
  setHeaders: cache && isProd ? function (res, path) {
    const mimeType = express.static.mime.lookup(path);
    let maxAge = config.expireHeaders.default;
    if (config.expireHeaders.hasOwnProperty(mimeType)) {
      maxAge = config.expireHeaders.get(mimeType);
    }
    res.setHeader('Cache-Control', 'public, max-age=' + ms(maxAge));
  } : null
}, options))

serverHooks.afterApplicationInitialized(({ app }) => {
  app.use('/OneSignalSDKUpdaterWorker.js', serve('src/modules/one-signal/OneSignalSDKUpdaterWorker.js', false, {
    setHeaders: function (res, path, stat) {
      res.set('Content-Type', 'text/javascript; charset=UTF-8')
    }
  }));

  app.use('/OneSignalSDKWorker.js', serve('src/modules/one-signal/OneSignalSDKWorker.js', false, {
    setHeaders: function (res, path, stat) {
      res.set('Content-Type', 'text/javascript; charset=UTF-8')
    }
  }));
})
