# Storyblok Integration

Here you can find quick installation guide for [Storyblok](https://www.storyblok.com/) CMS integration with Vue Storefront. 

Full documentation can be found [here](https://docs.vuestorefront.io/storyblok).

### Installation

---

Install module into your app.

```bash
npm install @vue-storefront/storyblok --save
```

or

```bash
yarn add @vue-storefront/storyblok
```

### Setup

---

Register the module in the `nuxt.config` file.

```javascript
modules: [
  ['@vue-storefront/storyblok/nuxt', {
    token: 'CONTENT_DELIVERY_TOKEN',
    cacheProvider: 'memory'
  }],
]
```

### Content Rendering 

---

Copy the `RenderContent.vue` component from the integration package.

```bash
cp node_modules/@vue-storefront/storyblok/components/RenderContent.vue cms/
```
