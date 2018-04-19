export default {
  title: 'Theme Catalog',
  titleTemplate: '%s - Vue Storefront',
  htmlAttrs: {
    lang: 'en'
  },
  meta: [
    { charset: 'utf-8' },
    { vmid: 'description', description: 'Vue Storefront is a standalone PWA storefront for your eCommerce, possible to connect with any eCommerce backend (eg. Magento, Prestashop or Shopware) through the API.' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1, minimal-ui' },
    { name: 'mobile-web-app-capable', content: 'yes' },
    { name: 'theme-color', content: '#f60' },
    { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' }
  ],
  link: [
    { rel: 'icon', href: '/assets/logo.png' },
    { rel: 'apple-touch-startup-image', href: '/assets/launcher-icon-2x.png' },
    { rel: 'apple-touch-icon', href: '/assets/launcher-icon-1x.png' },
    { rel: 'manifest', href: '/assets/manifest.json' }
  ]
}
