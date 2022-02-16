# Improving Core Web Vitals

TODO: Explain what are the Core Web Vitals

## Largest Contentful Paint (LCP)

The Largest Contentful Paint (LCP) represents the time needed to display the biggest element visible to the user within the initial viewport. To improve LCP, we need to start loading given resources as fast as possible. We can do that using "preloading".

TODO: Explain what is the preloading

Below we describe two ways of preloading resources in Nuxt.js, depending on your needs.

::: warning Be careful
Preloading too many resources can have the opposite effect and impact the performance.

Try to limit the number of resources preloaded because **if you prioritize everything, you don't prioritize anything**.
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

If you want to preload a resource on a specific page, e.g., an image used only on the homepage, use the `head` method in the Vue.js component.

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

## Cumulative Layout Shift (CLS)

TODO: Explain what is the CLS

When the browser parses the HTML, it will reserve the space for images based on their `width` and `height` attributes. When they are not defined, the browser will not do that, and when the image is loaded, it will have to make space for it by moving all other content causing layout shift.

To prevent that, use the image `width` and `height` attributes to let the browser know how much space it needs to save.

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
