<template>
  <component :is="page" />
</template>

<script>
import ProductPage from 'theme/pages/Product'
import CategoryPage from 'theme/pages/Category'
import CoreProduct from '@vue-storefront/core/pages/Product'
// import CoreCategory from '@vue-storefront/core/pages/Category'

export default {
  computed: {
    page () {
      return `${(this.$store.state.url.page)}-page`
    }
  },
  components: {
    CategoryPage,
    ProductPage
  },
  asyncData ({ store, route }) {
    return new Promise((resolve, reject) => {
      if (store.state.config.seo.useUrlDispatcher) {
        store.dispatch('url/mapUrl', { url: route.fullPath }, { root: true }).then((routeData) => {
          if (route.fullPath === '/fake/product/url.html') {
            route.params['parentSku'] = 'WS01'
            route.params['slug'] = 'gwyn-endurance-tee'
            store.state.url.page = 'product'
            CoreProduct.asyncData({ store, route }).then(res => resolve(res)).catch(err => reject(err))
          }
        })
      }
    })
  }
}
</script>
