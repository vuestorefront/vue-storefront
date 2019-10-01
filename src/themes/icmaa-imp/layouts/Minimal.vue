<template>
  <div class="minimal-layout">
    <div id="viewport" class="w-100 relative">
      <minimal-header />
      <slot />
      <minimal-footer />
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import MinimalHeader from 'theme/components/core/blocks/Header/MinimalHeader.vue'
import MinimalFooter from 'theme/components/core/blocks/Footer/MinimalFooter.vue'

export default {
  data () {
    return {
      ordersData: []
    }
  },
  computed: {
    ...mapState({
      overlayActive: state => state.ui.overlay
    })
  },
  methods: {
    ...mapGetters({ getMetaData: 'icmaaMeta/getData' }),
    fetchMetaData () {
      return this.$store.dispatch('icmaaMeta/load')
    }
  },
  serverPrefetch () {
    return Promise.all([
      this.fetchMetaData()
    ])
  },
  beforeMount () {
  },
  beforeDestroy () {
  },
  metaInfo () {
    return this.getMetaData()
  },
  components: {
    MinimalHeader,
    MinimalFooter
  }
}
</script>

<style lang="scss" src="theme/css/main.scss">

</style>
