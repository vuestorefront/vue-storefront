<template>
  <component :is="layout">
    <router-view/>
  </component>
</template>

<script>
import { mapState } from 'vuex'
const DefaultLayout = () => import('./layouts/Default')
const EmptyLayout = () => import('./layouts/Empty')
const MinimalLayout = () => import('./layouts/Minimal')

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
    MinimalLayout
  }
}
</script>
