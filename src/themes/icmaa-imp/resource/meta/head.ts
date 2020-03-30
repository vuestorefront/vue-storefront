import config from 'config'
import { router } from '@vue-storefront/core/app'

import Hreflang from 'icmaa-meta/helper/head/hreflang'
import { StoreView } from 'icmaa-config/types/ConfigState'

const defaults: any = (store: StoreView) => {
  const { storeCode, meta, facebook } = store
  const storeLang = store.i18n.defaultLanguage.toLowerCase()

  const hreflang = new Hreflang(store)
  const iconPath = `/assets/${config.icmaa.mandant}/meta`

  return {
    title: meta.title,
    titleTemplate: meta.titleTemplate.replace('{storeCode}', storeCode.toUpperCase()),
    htmlAttrs: {
      lang: storeLang
    },
    meta: [
      { charset: 'utf-8' },
      { vmid: 'description', name: 'description', content: meta.description.default },
      { vmid: 'keywords', name: 'keywords', content: meta.keywords.default },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=5' },
      { name: 'robots', content: 'index, follow' },
      { name: 'mobile-web-app-capable', content: 'yes' },
      { name: 'theme-color', content: '#ffffff' },
      { property: 'fb:page_id', content: facebook.pageId },
      { property: 'fb:app_id', content: facebook.appId },
      { vmid: 'og:image', property: 'og:image', content: facebook.opengraph.image },
      { property: 'og:locale', content: facebook.opengraph.locale },
      { property: 'og:site_name', content: facebook.opengraph.siteName },
      { property: 'og:url', content: config.icmaa_meta.base_url + router.currentRoute.path },
      { vmid: 'og:title', property: 'og:title', content: meta.title },
      { vmid: 'og:type', property: 'og:type', content: facebook.opengraph.type }, // website, product, article, book, music, video, place ...
      { name: 'apple-mobile-web-app-title', content: meta.apple.mobileWebAppTitle },
      { name: 'apple-mobile-web-app-status-bar-style', content: '#ffffff' },
      { name: 'apple-itunes-app', content: meta.apple.itunesApp },
      { name: 'ICBM', content: meta.geo.position },
      { name: 'geo.placename', content: meta.geo.placename },
      { name: 'geo.position', content: meta.geo.position },
      { name: 'geo.region', content: meta.geo.region }
    ],
    link: [
      ...hreflang.getItems(),
      {
        rel: 'icon',
        type: 'image/png',
        href: `${iconPath}/favicon-96x96.png`,
        sizes: '96x96'
      },
      {
        rel: 'icon',
        type: 'image/png',
        href: `${iconPath}/favicon-32x32.png`,
        sizes: '32x32'
      },
      {
        rel: 'icon',
        type: 'image/png',
        href: `${iconPath}/favicon-16x16.png`,
        sizes: '16x16'
      },
      {
        rel: 'apple-touch-icon',
        href: `${iconPath}/apple/apple-touch-icon.png`
      },
      {
        rel: 'apple-touch-startup-image',
        href: `${iconPath}/apple/apple_splash_2048.png`,
        sizes: '2048x2732'
      },
      { // iPad Pro 12.9
        rel: 'apple-touch-startup-image',
        href: `${iconPath}/apple/apple_splash_1668.png`,
        sizes: '1668x2224'
      },
      { // iPad Pro 10.5
        rel: 'apple-touch-startup-image',
        href: `${iconPath}/apple/apple_splash_1536.png`,
        sizes: '1536x2048'
      },
      { // iPad Air, Mini
        rel: 'apple-touch-startup-image',
        href: `${iconPath}/apple/apple_splash_1242_2688.png`,
        sizes: '1242x2688'
      },
      { // iPhone Xs Max
        rel: 'apple-touch-startup-image',
        href: `${iconPath}/apple/apple_splash_828.png`,
        sizes: '828x1792'
      },
      { // iPhone Xr
        rel: 'apple-touch-startup-image',
        href: `${iconPath}/apple/apple_splash_1125.png`,
        sizes: '1125x2436'
      },
      { // iPhone X, Xs
        rel: 'apple-touch-startup-image',
        href: `${iconPath}/apple/apple_splash_1242.png`,
        sizes: '1242x2208'
      },
      { // iPhone 8 Plus, 7 Plus, 6s Plus, 6 Plus
        rel: 'apple-touch-startup-image',
        href: `${iconPath}/apple/apple_splash_750.png`,
        sizes: '750x1334'
      },
      { // iPhone 8, 7, 6s, 6
        rel: 'apple-touch-startup-image',
        href: `${iconPath}/apple/apple_splash_640.png`,
        sizes: '640x1136'
      },
      { // iPhone 5, SE
        rel: 'manifest',
        href: `${iconPath}/android/manifest.json`
      }
    ],
    script: [
      {
        src: 'https://cdn.jsdelivr.net/npm/pwacompat@2.0.6/pwacompat.min.js',
        async: true,
        integrity: 'sha384-GOaSLecPIMCJksN83HLuYf9FToOiQ2Df0+0ntv7ey8zjUHESXhthwvq9hXAZTifA',
        crossorigin: 'anonymous'
      }
    ]
  }
}

export default defaults
