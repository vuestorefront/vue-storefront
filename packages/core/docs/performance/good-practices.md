# Web Performance good practices

Bellow you will find list of good practices that will help you optimize your website performance. 


⚫⚫⚪ - this indicator shows how impactful each problem can be


## Improving Core Web Vitals

### Have a fast Largest Contentful Paint ⚫⚫⚫

The Largest Contentful Paint (LCP) is one of the Google Web Vitals representing a time needed to display the biggest element visible to the User within the initial viewport.

::: tip HINTS
- You should preload the largest contentful paint, this will make it load faster.

```javascript
<link rel="preload" href="/path/to/image.jpg" as="image">
```

or

```javascript
head() {
 return {
    link: [
      {
        rel: 'preload',
        as: 'image',
        href: 'path/to/lcp/image',
      },
    ],
  }
}
```

- You should avoid lazy load images that are considered as LCP using the lazy attribute.

- You can also add importance="high" to the image to increase the load priority for now work's only in Chrome (Priority Hints)
:::

### Set height and width to the images to prevent layout shift ⚫⚫⚫

All images should have it's width and height set, browser when parsing html is reserving space for images, if it's dimensions are not set browser will reserve 0x0 px then when the image is loaded browser will know its size and refresh layout doing Layout Shift.

## Optimizing HTML andCSS

### Minify/Remove unnecessary CSS ⚫⚫⚪
When you are building a big application, you will get to a place where your project may have much more code that it actually needs and uses.

::: tip HINTS
- Use tools like CSS Minification.
- To eliminate unused css use a tool like PurgeCSS, or CSS Minification.
- Vue Storefront uses PurgeCSS out of the box, you just need to setup it in config:
```javascript
{
  buildModules: [ // if you are using nuxt < 2.9.0, use modules property instead.
    'nuxt-purgecss',
  ],

  purgeCSS: {
   // your settings here
  }
}
```
:::

### Avoid extensive DOM size ⚫⚫⚪

A large DOM will increase memory usage, cause longer style calculations, and produce costly layout reflows.

::: tip HINTS
- Take care of your own components, they should have as flat structure as possible, don’t nest HTML elements if it’s not necessary.
- Check if the library that you use doesn't create complex html structures, there are cases when a simple button generates 1000 lines of code.
:::

### Do not load specific print stylesheets ⚫⚪⚪

Loading a specific stylesheet for printing slows down the page, even though it is not used. You can include the print styles inside your other CSS file(s) just by using an @media query targeting type print.

### Optimizing JavaScript

### Minify/Remove unnecessary JS ⚫⚫⚪

When you are building a big application, you will get to a place where your project may have much more code that it actually needs and uses.

::: tip HINTS
- Use tools like Terser JS Plugin. In Nuxt, Terser is included by default.

- To eliminate unnecessary JavaScript you can use Terser mentioned previously or utilize - Tree Shaking to allow Dead Code Elimination. You can also use Code Splitting which will split code into bundles that can be loaded on demand.
Vue Storefront provides code-splitting out of the box
:::

### Avoid Serving legacy JavaScript to modern browsers ⚫⚫⚪
Polyfills and transforms enable legacy browsers to use new JavaScript features. However, many aren't necessary for modern browsers.

::: tip HINTS
- In Nuxt we have --modern with some options in the build command.
:::

### Reduce execution time ⚫⚫⚫
The combination of code splitting, minification and compression, removal of unused code and caching techniques will greatly improve execution time.

::: tip HINTS
- Consider reducing the time spent parsing, compiling and executing JS. You may find delivering smaller JS payloads helps with this.
- The idea is to optimize both our JS and CSS code, minimizing it and removing unused code, as well as the third-party libraries we are using.
- Keep the server response time for the main document short because all other requests depend on it.
:::

### Avoid using Google Tag Manager ⚫⚫⚫

Google Tag Manager makes it possible for non tech users to add scripts to your page that will downgrade performance.

### Reduce third-party usage ⚫⚫⚫

Think twice you really need it, if yes don't load it on pages where they will not be used (eg. reCAPTCHA  on the home page if there is no form).
Third-party code can significantly impact load performance. You can however modify the way you are using this third party library.

::: tip HINTS
- Load scripts using the async or defer attribute to avoid blocking document parsing.
- Self-host the script if the third-party server is slow.
- Remove the script if it doesn't add clear value to your site.
- Use link rel=preconnect or link rel=dns-prefetch to perform a DNS lookup for domains hosting third-party scripts.
- You can lazy load third-party resources [with facades](https://web.dev/third-party-facades/?utm_source=lighthouse&utm_medium=devtools)
- Move third parties to web worker using eg Partytown, you can do it easily with VSF using nuxt [Partytown module](https://github.com/nuxt-community/partytown-module)
:::

## Optimizing images

### Keep image size small and serve them in next gen formats  ⚫⚫⚫

You should always compress images, there is lot of lossless compression file types supported with all modern browsers (eg. webp). This is the most common performance bottleneck, where images are not compressed and weigh multiple times more than they could if compressed.

::: tip HINTS
- You can use nuxt-image library to automatically transform images on the fly to next gen formats and compress them using one of many available providers (eg. Cloudinary or local instance of ipx)
:::

### Avoid loading images as a background images above the fold  ⚫⚫⚫

Images declared in the CSS files are often downloaded later because first, proper css needs to be downloaded and parsed.

::: tip HINTS
- If possible, declare the biggest images visible on the page in an HTML document without lazy loading instead of in CSS files.
:::

### Lazy load offscreen images ⚫⚫⚫

Lazy loading is a technique used to prevent unnecessary resources to be downloaded on the page render. Users get only images (or other types of resources, as videos or even whole components) that are shown in the current viewport. Rest is downloaded when needed, eg. if we have an image in the footer it will be downloaded only when User scrolls near it. 

Only images above the fold should be loaded on page render, rest should be lazy loaded.
Remember don't lazy load image that is potential candidate for Largest Contentful Paint.

::: tip HINTS
- If you are using SFUI components eg. SfImage, all images are lazy loaded automatically. But if you are using your own implementation remember to use 
```html
<img loading=lazy>
```
 or eg. nuxt-lazy-load library (depending on your needs and browser support).
- If you want to use lazy loading in Nuxt 3 go with this [lazy-load module](https://github.com/nuxt-modules/lazy-load).
:::

### Favicon should be small and cacheable ⚫⚪⚪

It is easy to make the favicon big but please avoid doing that, because every browser will then perform an unnecessarily large download. And make sure the cache headers are set for a long time for the favicon. It is easy to miss since it's another content type.

### Avoid scaling images in the browser ⚫⚫⚫

If you need a 300x300 image (e.g. on mobile) don't download 1000x1000 and scale it in the browser, doing that is bad for performance. Users will download extra kilobytes of data that could be avoided. Also extra CPU will be needed to handle it. 

::: tip HINTS
- Make sure you create multiple versions of the same image server-side and serve the appropriate one depending on needed size (eg different on mobile and desktop).
- In vue/nuxt applications you can use the nux-image library that will help you to resize and optimize images. 
- You can use picture and srcset to load images depending on device resolution.
:::
## Other optimizations

### Avoid render blocking resources ⚫⚫⚫

Scripts and stylesheets can block the first paint of your page (if they are in head and don’t have async or defer for scripts and media or disabled for stylesheets).

Consider delivering critical JS/CSS inline and deferring all non-critical JS/styles. You can reduce the size of your pages by only shipping the code and styles that you need.

::: tip HINTS
- Once you've identified critical code, move that code from the render-blocking URL to an inline script tag in your HTML page.
- Inline critical styles required for the first paint inside a style block at the head of the HTML page and load the rest of the styles asynchronously using the preload link.
:::

### Total page size shouldn't be too big ⚫⚫⚫

Avoid having pages that have a transfer size more than 2 MB (desktop) and 1 MB (mobile) because it will hurt performance and will make the page expensive for the user if she/he pays for the bandwidth.

### Avoid too many fonts ⚫⚫⚪

How many fonts do you need on a page for the user to get the message? Fonts can slow down the rendering of content, try to avoid loading too many of them because worst case it can make the text invisible until they are loaded (FOIT—flash of invisible text), best case they will flicker the text content when they arrive.

::: tip HINTS
- If you are using Google fonts and need it for eg. logo or header text you can set text value in your request url, this can reduce the size of the font file by up to 90%.
:::

### All text remains visible during webfont loads ⚫⚫⚪
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
<link href="https://fonts.googleapis.com/css?family=Roboto:400,700&**display=swap**" rel="stylesheet">
```

### Avoid using more than one library version per page ⚫⚫⚪

There are sites out there that use multiple versions of the same library on the same page. You shouldn't do that because the user will then unnecessarily download extra data. Cleanup the code and make sure you only use one version.

::: tip HINTS
- You can check if you have multiple versions of the same library in your Nuxt application (Nuxt uses webpack-bundle-analyzer) by running 
yarn nuxt build --analyze
:::

### Add SSR caching layer ⚫⚫⚫
Caching helps reduce network latency, and it’s cost effective, you can use it witn CDN’s that will serve your content even if the origin server will be down. Properly implemented caching can have a huge impact on performance especially on TTFB (Time to First Byte).

In Nuxt you can cache whole pages that are rendered on the server side that will reduce TTFB and server resources needed to generate pages.

::: tip HINTS
- To cache server side rendered pages you can use Redis. Using the Redis node app directly can be slow, so you should consider using e.g. Lua Cache.
:::

### Avoid document.write ⚫⚫⚪

For users on slow connections, external scripts dynamically injected via document.write() can delay page load by tens of seconds.

::: tip HINTS
- Third parties are most often a source of document.write, make sure yours don’t do it.
:::

### Compress text content ⚫⚫⚪

Make sure you compress HTML, JSON, JavaScript, CSS and SVG. It will save bytes for the user making the page load faster and use less bandwidth.

::: tip HINTS
- Enable GZIP or Brotli compression on the server.
- To enable compression on the nuxt side you can use [nuxt compression module](https://github.com/nuxt-modules/compression) or [nuxt-compress](https://www.npmjs.com/package/nuxt-compress).
:::

### Don't close a connection that is used multiple times ⚫⚫⚪

Use keep-alive headers and don't close the connection when you have multiple requests to the same domain.

::: tip HINTS
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
:::

### Preconnect with external domains like your CDN or fonts gstatic ⚫⚫⚪

They are key resources needed when rendering a page, if they are not on your domain you can consider preconnecting to them, then connections will be created parallely instead one after another which will give improvement in load speed.

::: tip HINTS
- Consider adding preconnect or dns-prefetch resource hints to establish early connections to important third-party origins.

```javascript
<link rel="preconnect" href="https://example.com">
<link rel="dns-prefetch" href="https://example.com">
```

dns-prefetch works exactly the same as preconnect but has wider browser support.
:::

### Preload key requests ⚫⚫⚪
There are some key requests that are needed to render part of the page that is above the fold, it’s good practice to preload them so they get higher priority and can be downloaded earlier.
 
::: tip HINTS
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
:::

### Avoid Multiple page redirects ⚫⚫⚫
Redirects introduce additional delays before the page can be loaded.

::: tip HINTS
- If you can’t avoid redirects, it’s better to do them on server-side.
:::

### Avoid Enormous network payloads ⚫⚫⚫
Large network payloads cost users real money and are highly correlated with long load times.

::: tip HINTS
- Defer requests until they're needed. Nuxt is taking care of it.
- Don't fetch unnecessary data, limit your responses to minimum.
- Optimize requests to be as small as possible, minimizing and compressing, try to use WebP for the images when it's possible. An image CDN will be always there to keep our performance up!
- Cache requests so the page doesn't re-download the resources on repeat visits.
:::

### Resources
Bellow you can find some great resources that helped us to write those suggestions:
[web.dev](https://web.dev/), [sitesped.io](https://www.sitespeed.io/), Lighthouse and [Jakub Andrzejewski blog post](https://dev.to/theandrewsky/performance-checklist-for-vue-and-nuxt-cog)
