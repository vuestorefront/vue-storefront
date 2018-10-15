<template>
  <div id="app">
    <div id="viewport" class="w-100 relative">
      <minimal-header/>
      <search-panel/>
      <wishlist/>
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
import SearchPanel from '../components/core/blocks/SearchPanel/SearchPanel'
import Wishlist from '../components/core/blocks/Wishlist/Wishlist'

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
    Wishlist,
    SearchPanel,
    MinimalHeader,
    MinimalFooter
  }
}
</script>

<style lang="scss" src="theme/css/main.scss">

</style>
