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
    { name: 'theme-color', content: '#ffffff' },
    { name: 'apple-mobile-web-app-status-bar-style', content: '#ffffff' }
  ],
  link: [
    { rel: 'icon', href: '/assets/logo.png' },
    { rel: 'apple-touch-icon', href: '/assets/launcher-icon-1x.png' },
    { rel: 'apple-touch-startup-image', href: '/assets/launcher-icon-144x144.png' },
    { rel: 'apple-touch-icon', href: '/assets/apple_splash_2048.png', sizes: '2048x2732' },
    { rel: 'apple-touch-icon', href: '/assets/apple_splash_1668.png', sizes: '1668x2224' },
    { rel: 'apple-touch-icon', href: '/assets/apple_splash_1536.png', sizes: '1536x2048' },
    { rel: 'apple-touch-icon', href: '/assets/apple_splash_1125.png', sizes: '1125x2436' },
    { rel: 'apple-touch-icon', href: '/assets/apple_splash_1242.png', sizes: '1242x2208' },
    { rel: 'apple-touch-icon', href: '/assets/apple_splash_750.png', sizes: '750x1334' },
    { rel: 'apple-touch-icon', href: '/assets/apple_splash_640.png', sizes: '640x1136' },
    { rel: 'manifest', href: '/assets/manifest.json' },
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?family=Material+Icons' }
  ]
}
