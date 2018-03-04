<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  components: {
    // Place main website components here (eg. overlay, header, footer, side menus)
    // Other components should be placed in pages they are displayed in
  },
  metaInfo: {
    title: 'Vue Storefront',
    titleTemplate: '%s  - Vue Storefront',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { description: 'Vue Storefront is a standalone PWA storefront for your eCommerce, possible to connect with any eCommerce backend (eg. Magento, Prestashop or Shopware) through the API.' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, minimal-ui' },
      { name: 'mobile-web-app-capable', content: 'yes' },
      { name: 'theme-color', content: '#f60' },
      { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' }
    ]
  }
}
</script>

<style lang="scss" src="./css/main.scss">
