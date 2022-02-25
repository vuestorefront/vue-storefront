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
        src: `<SCRIPT_URL>`,
        defer: true
      }
    ]
  }
};
```

Additionally, you can add use [media-dependent](https://developer.mozilla.org/en-US/docs/Web/CSS/@import) import in your CSS:

```css
//main.scss
@import '@/assets/main.scss' print;
```

## Inline critical assets :ledger:

Consider delivering critical JavaScript/CSS inline and deferring all non-critical assets. You can reduce the size of your pages by only shipping the code and styles that you need at the given time.

Once you've identified critical code, move that code from the render-blocking URL to an inline `<script>` tag. Do the same for the styles required for the first paint inside a `<style>` block at the `<head>` of the HTML page and load the rest of the styles asynchronously using the `preload` link.

## Swap fonts :ledger:

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

## Avoid using more than one library version per page :ledger:

Check if your website doesn't use multiple versions of the same library. This will make the user download unnecessary data and slow down your page. Clean up the code and make sure you only use one version by running the following command. It will generate a report of what's in the final bundle.

```bash
yarn nuxt build --analyze
```

## Compress text content :ledger:

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

Consider adding `preconnect` or `dns-prefetch` resource hints to establish early connections to important third-party origins. `dns-prefetch` works the same as `preconnect` but has broader browser support.

```javascript
<link rel="preconnect" href="https://example.com">
<link rel="dns-prefetch" href="https://example.com">
```

## Avoid multiple redirects :blue_book:

Redirects introduce additional delays before the browser can load the page. If you can't avoid redirects, it's better to do them on the server side.

## Avoid large network payloads :ledger:

Large network payloads cost users real money and increase the loading times.

* Defer requests until they're needed.
* Don't fetch unnecessary data. Limit your responses to a minimum.
* Optimize requests to be as small as possible, minimize and compress them.
* Cache requests, so the page doesn't re-download the resources on repeat visits.

