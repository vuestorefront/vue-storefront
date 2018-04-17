export default {
  title: 'Default Theme',
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
    { rel: 'manifest', href: '/assets/manifest.json' },
    { rel: 'preload', href: 'https://unpkg.com/flexboxgrid2@7.1.0/flexboxgrid2.css', as: 'style', onload: 'this.rel="stylesheet"' },
    { rel: 'preload', href: 'https://fonts.googleapis.com/icon?family=Material+Icons', as: 'style', onload: 'this.rel="stylesheet"' },
    { rel: 'preload', href: 'https://fonts.googleapis.com/css?family=Montserrat:300,400,400i,500,600,700,800', as: 'style', onload: 'this.rel="stylesheet"' }
  ]
}
