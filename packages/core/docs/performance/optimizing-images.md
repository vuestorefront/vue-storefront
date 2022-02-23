# Optimizing images

Images are likely the most straightforward resource to optimize. Yet if you forget to do it for at least one of them, your website might become a few megabytes heavier.

On this page, we will share some tips on how you can prevent that.

## Use the `@nuxt/image` package :orange_book:

Using the [`<nuxt-img>`](https://image.nuxtjs.org/components/nuxt-img) component from the [@nuxt/image](https://image.nuxtjs.org/) package is likely the single best thing you can do to stop worrying about images. It offers features for most of the things mentioned in the following sections. Using most of them only requires you to pass a single attribute.

It offers image resizing, converting formats, preloading, and integrations with the most popular image transformation services.

```html
<nuxt-img
  src="/hero-image.png"
  format="webp"
  quality="80"
  width="200"
  height="100"
  loading="lazy"
/>
```

## Compress images using next-generation formats :orange_book:

The most common performance bottlenecks are images that are not compressed and weigh multiple times more than they should. For this reason, you should always compress images, and luckily nowadays, there are plenty of lossless and lossy file types supported in modern browsers.

If you have just a few static images on your website, you can manually compress them using a website like [Squoosh.app](https://squoosh.app/). However, if you have more images or want it to happen automatically, you can use the `@nuxt/image` package mentioned above.

## Don't declare images in CSS :ledger:

Images declared in the CSS files are often downloaded much later than those in HTML because the browser has to download and parse the CSS file before knowing that it has to load and display an image.

If the image is also the biggest element visible to the user within the initial viewport, it will also negatively impact the [Largest Contentful Paint](/performance/improving-core-web-vitals.html#largest-contentful-paint-lcp) time.

```diff
- <style>
- .hero {
-   background-image: url("/hero-image.png")
- }
- </style>

+ <div class="hero">
+   <img src="/hero-image.png">
+ </div>
```

## Lazy load offscreen images :orange_book:

Lazy loading is a technique used to prevent or delay the loading of non-critical resources until they are needed. You can use this mechanism for different types of resources, but in the case of images, our goal is to lazily load everything that is not visible to the user within the initial viewport. All other images can be loaded when the user scrolls down the page.

Use the `loading="lazy"` attribute to load an image lazily. It also works for the `<nuxt-img>` component.

```html
<img src="..." loading="lazy">
<nuxt-image src="..." loading="lazy" />
```

If you want to load resources other than images lazily, check out the [vue-lazyload](https://www.npmjs.com/package/vue-lazyload) package.

## Scale images on the server, not browser :orange_book:

Don't download big images to scale them down in the browser because it results in downloading data and processing that you could have avoided. Instead, use a tool or service that creates multiple versions of the same image server-side and serves the appropriate one depending on the size.

Here's the example using the `<nuxt-img>` component that will handle this automatically.

```html
<nuxt-img
  src="/hero-image.png"
  width="300"
  height="300"
  sizes="sm:100vw md:50vw lg:400px"
/>
```
