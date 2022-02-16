# Other optimizations

TODO: Add intro

## Avoid render blocking resources

Scripts and stylesheets can block the first paint of your page (if they are in head and don’t have async or defer for scripts and media or disabled for stylesheets).

Consider delivering critical JS/CSS inline and deferring all non-critical JS/styles. You can reduce the size of your pages by only shipping the code and styles that you need.

- Once you've identified critical code, move that code from the render-blocking URL to an inline script tag in your HTML page.
- Inline critical styles required for the first paint inside a style block at the head of the HTML page and load the rest of the styles asynchronously using the preload link.

## Total page size shouldn't be too big

Avoid having pages that have a transfer size more than 2 MB (desktop) and 1 MB (mobile) because it will hurt performance and will make the page expensive for the user if she/he pays for the bandwidth.

## Avoid too many fonts

How many fonts do you need on a page for the user to get the message? Fonts can slow down the rendering of content, try to avoid loading too many of them because worst case it can make the text invisible until they are loaded (FOIT—flash of invisible text), best case they will flicker the text content when they arrive.

If you are using Google fonts and need it for eg. logo or header text you can set text value in your request url, this can reduce the size of the font file by up to 90%.

## All text remains visible during webfont loads

Leverage the font-display CSS feature to ensure text is user-visible while webfonts are loading.

```css
@font-face {
  font-family: 'Arial';
  font-display: swap;
}
```

The font-display API specifies how a font is displayed. swap tells the browser that text using the font should be displayed immediately using a system font. Once the custom font is ready, it replaces the system font.

For Google fonts, for example, is as simple as adding the &display=swap parameter to the end to the Google Fonts URL:

```html
<link href="https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap" rel="stylesheet">
```

## Avoid using more than one library version per page

There are sites out there that use multiple versions of the same library on the same page. You shouldn't do that because the user will then unnecessarily download extra data. Cleanup the code and make sure you only use one version.

You can check if you have multiple versions of the same library in your Nuxt application (Nuxt uses webpack-bundle-analyzer) by running

```bash
yarn nuxt build --analyze
```

## Add SSR caching layer

Caching helps reduce network latency, and it’s cost effective, you can use it witn CDN’s that will serve your content even if the origin server will be down. Properly implemented caching can have a huge impact on performance especially on TTFB (Time to First Byte).

In Nuxt you can cache whole pages that are rendered on the server side that will reduce TTFB and server resources needed to generate pages.

To cache server side rendered pages you can use Redis. Using the Redis node app directly can be slow, so you should consider using e.g. Lua Cache.

## Avoid document.write

For users on slow connections, external scripts dynamically injected via document.write() can delay page load by tens of seconds.

Third parties are most often a source of document.write, make sure yours don’t do it.

## Compress text content

Make sure you compress HTML, JSON, JavaScript, CSS and SVG. It will save bytes for the user making the page load faster and use less bandwidth.

- Enable GZIP or Brotli compression on the server.
- To enable compression on the nuxt side you can use [nuxt compression module](https://github.com/nuxt-modules/compression) or [nuxt-compress](https://www.npmjs.com/package/nuxt-compress).

## Don't close a connection that is used multiple times

Use keep-alive headers and don't close the connection when you have multiple requests to the same domain.

- The HTTP/1.0 clients request persistent Connection by sending the "Connection: keep-alive" request header to the server. 

- In HTTP/1.1, all connections are considered persistent unless declared otherwise. 

- In HTTP/2 connection and Keep-Alive headers are not allowed in HTTP/2. Chrome and Firefox ignore these headers in HTTP/2 responses, but Safari will not load the web page if the server returns these headers in error.

```javascript
Example:
GET /echo HTTP/1.0
Host: vuestorefront.io
Connection: keep-alive
Keep-Alive: timeout=5, max=100
```

## Preconnect with external domains like your CDN or fonts gstatic

They are key resources needed when rendering a page, if they are not on your domain you can consider preconnecting to them, then connections will be created parallely instead one after another which will give improvement in load speed.

- Consider adding preconnect or dns-prefetch resource hints to establish early connections to important third-party origins.

```javascript
<link rel="preconnect" href="https://example.com">
<link rel="dns-prefetch" href="https://example.com">
```

`dns-prefetch` works exactly the same as `preconnect` but has wider browser support.

## Preload key requests

There are some key requests that are needed to render part of the page that is above the fold, it’s good practice to preload them so they get higher priority and can be downloaded earlier.

- Declare preload links in your HTML to instruct the browser to download key resources as soon as possible.

```javascript
<head>
  <link rel="preload" href="critical.css" as="style">
  <link rel="preload" href="critical.js" as="script">
</head>
```

In Vue Storefront you can do it easily, just add link to nuxt.config.js 

```javascript
// `nuxt.config.js`
module.exports = {
  head: {
    link: [
      {
        rel: 'preload',
        as: 'style',
        href: 'https://fonts.googleapis.com/css?family=Roboto'
      }
    ]
  }
}
```

## Avoid Multiple page redirects

Redirects introduce additional delays before the page can be loaded.

If you can’t avoid redirects, it’s better to do them on server-side.

## Avoid Enormous network payloads

Large network payloads cost users real money and are highly correlated with long load times.

- Defer requests until they're needed. Nuxt is taking care of it.
- Don't fetch unnecessary data, limit your responses to minimum.
- Optimize requests to be as small as possible, minimizing and compressing, try to use WebP for the images when it's possible. An image CDN will be always there to keep our performance up!
- Cache requests so the page doesn't re-download the resources on repeat visits.

## Use Priority Hints

You can add `importance: 'high'` attribute to the image to increase the load priority, but for now it only works in Chrome. This mechanism is called "Priority Hints".

## Additional resources

Bellow you can find some great resources that helped us to write those suggestions:
[web.dev](https://web.dev/), [sitesped.io](https://www.sitespeed.io/), Lighthouse and [Jakub Andrzejewski blog post](https://dev.to/theandrewsky/performance-checklist-for-vue-and-nuxt-cog)
