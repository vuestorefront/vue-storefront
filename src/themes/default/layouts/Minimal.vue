<template>
  <div id="app">
    <div id="viewport" class="w-100 relative">
      <minimal-header/>
      <router-view/>
      <minimal-footer/>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import MinimalHeader from 'theme/components/core/blocks/Header/MinimalHeader.vue'
import MinimalFooter from 'theme/components/core/blocks/Footer/MinimalFooter.vue'

import Head from 'theme/resource/head'

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
  },
  beforeMount () {
  },
  beforeDestroy () {
  },
  metaInfo: Head,
  components: {
    MinimalHeader,
    MinimalFooter
  }
}
</script>

<style lang="scss" src="theme/css/main.scss">

</style>
