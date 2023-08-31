# Improving Core Web Vitals

Web Vitals are unified and simplified metrics created by Google to help site owners understand the quality of experience they are delivering to their users. Core Web Vitals are the subset of Web Vitals focused on three aspects of the user experience - loading (LCP), interactivity (FID), and visual stability (CLS).

[Read more about Web Vitals](https://web.dev/vitals/).

## Largest Contentful Paint (LCP) :orange_book:

The Largest Contentful Paint (LCP) represents the time needed to display the biggest element visible to the user within the initial viewport. To improve the LCP metric, you need to start loading that element as fast as possible. If it needs an asset like JavaScript, CSS, image, or font, use the "preloading". It's a technique for telling a browser to download a resource before it discovers it's needed.

For example, you might have a font that the browser can discover late (because it first needs to download and parse the CSS file), but you know that it's critical to your website. You can preload it, so once the browser parses the CSS and finds out that the font is needed, it will already have it downloaded.

[Read more about preloading critical assets](https://web.dev/preload-critical-assets/).

Below we describe two ways of preloading resources in Nuxt.js, depending on your needs.

::: warning Be careful
Preloading too many resources can have the opposite effect and impact the performance.

Try to limit the number of resources preloaded to just those visible on the initial viewport. **If you prioritize everything, you don't prioritize anything**.
:::

### Preloading resource on every page

If you want to preload a resource on every page, e.g., the font used across the whole website, use the `head` property in the `nuxt.config.js` file.

:::tip
If you are using Google Fonts, we recommend loading them using the [@nuxtjs/google-fonts](https://google-fonts.nuxtjs.org/) package. It offers reasonable defaults and performance-oriented options.
:::

```javascript
// nuxt.config.js

export default {
  head: {
    link: [
      {
        rel: 'preload',
        as: 'style',
        href: '.../stylesheet.css'
      }
    ]
  }
};
```

### Preloading resource on a specific page

If you want to preload a resource on a specific page, e.g., a hero image used only on the homepage, use the `head` method in the Vue.js component.

::: tip
If you use the [@nuxt/image](https://image.nuxtjs.org/) package, you don't have to use the `head` method. Instead you can add ["preload" attribute](https://image.nuxtjs.org/components/nuxt-img#preload) to the `<nuxt-img>` component.
:::

```vue
<script>
export default {
  head() {
    return {
      link: [
        {
          rel: 'preload',
          as: 'image',
          href: '...',
        }
      ]
    }
  }
};
</script>
```

### How to identify what is the Largest Contentful Paint

The easiest way to learn which element is the Largest Contentful Paint is to use the Core Web Vital test on the [WebPageTest](https://www.webpagetest.org/webvitals) page. Enter the website URL, select one of the recommended locations and browsers, and click the `Start Test` button.

Another option is to run Lighthouse in Chrome DevTools, described on [Google Developers](https://developers.google.com/web/tools/lighthouse#devtools) website.

## Cumulative Layout Shift (CLS) :orange_book:

Cumulate Layout Shift is an important user-centric metric for measuring visual stability, which shows if page had any unexpected movement.

[Read more about CLS](https://web.dev/cls/)

When the browser parses the HTML, it will reserve the space for images based on their `width` and `height` attributes. When they are not defined, the browser will not do that, and when the image is loaded, it will have to make space for it by moving all other content causing layout shift.

### Always declare image width and height

To prevent layout shifts, always use the image `width` and `height` attributes to let the browser know how much space it needs to save. Remember to do it for all images, including header logos.

::: tip
If you are using the [@nuxt/image](https://image.nuxtjs.org/) package, you can use the same attributes in the `<nuxt-img>` component.
:::

```html
<img
  src="..."
  width="128"
  height="128"
  >
```
