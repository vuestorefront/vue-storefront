<template>
  <div id="app">
    <component :is="layout">
      <router-view/>
    </component>
  </div>
</template>

<script>
import config from 'config'
import { mapState } from 'vuex'
const DefaultLayout = () => import(/* webpackChunkName: "vsf-layout-default" */ './layouts/Default')
const EmptyLayout = () => import(/* webpackChunkName: "vsf-layout-empty" */ './layouts/Empty')
const MinimalLayout = () => import(/* webpackChunkName: "vsf-layout-minimal" */ './layouts/Minimal')

export default {
  data () {
    return {
      ordersData: []
    }
  },
  computed: {
    ...mapState({
      overlayActive: state => state.ui.overlay
    }),
    layout () {
      return `${(this.$route.meta.layout || 'default')}-layout`
    }
  },
  methods: {
    fetchMenuData () {
      return this.$store.dispatch('category/list', { includeFields: config.entities.optimize ? config.entities.category.includeFields : null })
    }
  },
  serverPrefetch () {
    return this.fetchMenuData()
  },
  components: {
    DefaultLayout,
    EmptyLayout,
    MinimalLayout
  }
}
</script>
