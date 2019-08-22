<template>
  <div id="app">
    <lazy-hydrate when-idle>
      <component :is="layout">
        <router-view />
      </component>
    </lazy-hydrate>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import LazyHydrate from 'vue-lazy-hydration'
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
  components: {
    DefaultLayout,
    EmptyLayout,
    MinimalLayout,
    LazyHydrate
  }
}
</script>
