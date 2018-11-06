<template>
  <component :is="layout">
    <router-view/>
  </component>
</template>

<script>
import { mapState } from 'vuex'
import DefaultLayout from './layouts/Default'
import EmptyLayout from './layouts/Empty'
import MinimalLayout from './layouts/Minimal'
import { Product, Category } from './router/asyncRoutes'

export default {
  data () {
    return {
      ordersData: []
    }
  },
  mounted () {
    // preload product and category page
    window.addEventListener('load', () => {
      Product()
      Category()
    })
  },
  computed: {
    ...mapState({
      overlayActive: state => state.ui.overlay
    }),
    layout () {
      return `${(this.$route.meta.layout || 'default')}-layout`
    }
  },
  components: {
    DefaultLayout,
    EmptyLayout,
    MinimalLayout
  }
}
</script>
