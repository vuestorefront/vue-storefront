# Other optimizations

There are plenty of general optimizations that didn't fit the previous categories or improve multiple areas of the application.

## Avoid render-blocking resources :orange_book:

Render-blocking resources are scripts, stylesheets, and other imports in the `<head>` that delay the browser from rendering page content to the screen until they are downloaded and parsed. Such resources delay the First Paint - time needed for the browser to render something (i.e., background colors, borders, text, or images) for the first time. To prevent that:

* add the `defer` or `async` attribute to the `<script>`,
* use `disabled` or `media` attributes for the stylesheets.

Nuxt is deferring every bundle script it generates. If you want to deffer third party scripts, just add them in the `nuxt.config` as shown in the example below:

```javascript
// nuxt.config.js

export default {
  head: {
    script: [
      {
        src: `https://www.google-analytics.com/analytics.js`,
        defer: true
      }
    ]
  }
};
```

Additionally, you can use [media-dependent](https://developer.mozilla.org/en-US/docs/Web/CSS/@import) import in your CSS if you have stylesheets for specific resolutions or device types. This way browser only loads stylesheets for that particular device, and you can make main stylesheets smaller.

```css
/* main.scss */

@import '@/assets/print.scss' print;
@import '@/assets/landscape.scss' screen and (orientation:landscape);
```

## Inline critical CSS :ledger:

Consider delivering critical CSS inline and deferring all non-critical assets. You can reduce the size of your pages by only shipping the styles that the browser needs at the given time.

Move the styles required for the first paint to a `<style>` block in the `<head>` of the HTML page and load the rest of them asynchronously using the `preload` link.

## Use font placeholders while others are loading :ledger:

Leverage the `font-display` CSS feature to ensure that the text is visible to the user while web fonts are loading.

```css
@font-face {
  font-family: 'Arial';
  font-display: swap;
}
```

The `font-display` API specifies how a font is displayed. The `swap` value tells the browser that the text using this font should be displayed immediately using a system font. Once the custom font is ready, it replaces the system font.

If you are using Google Fonts, add the `&display=swap` parameter to the end to the Google Fonts URL:

```html
<link href="https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap" rel="stylesheet">
```

If you are using the `@nuxtjs/google-fonts` package, you can use the [display](https://google-fonts.nuxtjs.org/options#display) property.

## Avoid using more than one library version :ledger:

Check if your website doesn't use multiple versions of the same library. This will make the user download unnecessary data and slow down your page. Clean up the code and make sure you only use one version by running the following command to generate a report of what's in the final bundle.

```bash
yarn nuxt build --analyze
```

You can also use the [duplicate-package-checker-webpack-plugin](https://www.npmjs.com/package/duplicate-package-checker-webpack-plugin) library to warn you if it detects multiple versions of the same package:

```javascript
export default {
  build: {
    plugins: [
      new webpack.DefinePlugin({
        'process.VERSION': JSON.stringify({
          DuplicatePackageCheckerPlugin: require('duplicate-package-checker-webpack-plugin'),
        })
      })
    ]
  }
} 
```

## Compress your files :ledger:

Ensure you compress HTML, JSON, JavaScript, CSS, and SVG. It will save bandwidth for you and the user and make the page load faster.

There are two ways you can do that:

* (Recommended) Enable GZIP or Brotli compression on the server.
* To enable compression in Nuxt.js using the [nuxt compression](https://github.com/nuxt-modules/compression) or [nuxt-compress](https://www.npmjs.com/package/nuxt-compress) modules.

## Don't close connection used multiple times :blue_book:

By default, HTTP connections close after each request. When the user enters your website, the browser needs to create a new connection for every resource that makes up your web pages (JavaScript, CSS, images, etc.).

To prevent this, use the HTTP `keep-alive` header to maintain a connection between the user browser and your server, reducing the time needed to serve these assets. This will reduce the number of TCP and SSL/TLS connection requests, leading to a drop in round trip time (RTT).

* The HTTP/1.0 clients request persistent connection by sending the `Connection: keep-alive` request header to the server.
* In HTTP/1.1, all connections are considered persistent unless declared otherwise.
* In HTTP/2 connection and Keep-Alive headers are not allowed. Chrome and Firefox ignore them, but Safari will not load the web page if the server returns these headers in error.

```javascript
Example:
GET /echo HTTP/1.0
Host: vuestorefront.io
Connection: keep-alive
Keep-Alive: timeout=5, max=100
```

## Preconnect with external domains like your CDN or fonts provider :ledger:

If a critical resource needed to render a page is not on your domain, you can consider preconnecting to that domain. The browser will create the connections, so it's ready when the resource is needed.

Consider adding `preconnect` or `dns-prefetch` resource hints to establish early connections to important third-party origins. `dns-prefetch` works similarly to `preconnect` but has broader browser support.

```javascript
<link rel="preconnect" href="https://example.com">
<link rel="dns-prefetch" href="https://example.com">
```

In many cases, "preconnect" can negatively impact the performance, so you should make an informed decision about whether to use it or not. Additionally, because browsers close connections not used in the last 10 seconds, you should avoid preconnecting to a domain not used immediately.

## Avoid multiple redirects :blue_book:

Redirects introduce additional delays before the browser can load the page. If you can't avoid redirects, it's better to do them on the server side.

## Avoid large network payloads :ledger:

Remember that it costs users real money to download large network resources such as images, movies, JSON files, or API responses. For this reason, you should:

* Defer requests until they're needed.
* Don't fetch unnecessary data. Limit your responses to a minimum.
* Optimize requests to be as small as possible, minimize and compress them.
* Cache requests, so the page doesn't re-download the resources on repeat visits.
