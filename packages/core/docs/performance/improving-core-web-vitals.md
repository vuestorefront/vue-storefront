# Improving Core Web Vitals

Web Vitals was cerated by google to help site owners understand the quality of experience they are delivering to their users. 

They are unified and simplified metrics so anyone can check their site and understand the results.

Core Web Vitals are the subset of Web Vitals focused on three aspects of the user experience - loading (LCP), interactivity (FID), and visual stability (CLS)

[Read more about Web Vitals](https://web.dev/vitals/)

## Largest Contentful Paint (LCP) :orange_book:

The Largest Contentful Paint (LCP) represents the time needed to display the biggest element visible to the user within the initial viewport. To improve LCP, we need to start loading given resources as fast as possible. We can do that using "preloading".

Preloading is a technique that give us possibility to tell the browser to download the resource before it actually needs it. 
For example, we have a font file that can be discovered late (browser first need to download and parse css file) but we know that it's critical to our website. In this case we can preload it so if browser will parse css and find out that the font file is needed it will already have it downloaded. 

[Read more about preloading critical assets](https://web.dev/preload-critical-assets/)

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

## Cumulative Layout Shift (CLS) :orange_book:

Cumulate Layout Shift is an important user-centric metric for measuring visual stability. 

It shows us if any unexpected movement on our page ocurred. 

[Read more about CLS](https://web.dev/cls/)

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
