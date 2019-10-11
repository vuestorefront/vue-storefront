<template>
  <div id="home" class="t-container">
    <teaser tags="2" class="sm:t-pt-4 t-pb-8" />
    <teaser tags="2" :show-large="false" :show-small-in-row="true" class="t-pb-8" />
  </div>
</template>

<script>
import config from 'config'
import { mapGetters } from 'vuex'
import { onlineHelper } from '@vue-storefront/core/helpers'

import Teaser from 'theme/components/core/blocks/Teaser/Teaser'

export default {
  components: {
    Teaser
  },
  mounted () {
    if (!this.isLoggedIn && localStorage.getItem('redirect')) {
      this.$bus.$emit('modal-show', 'modal-signup')
    }
  }
}
</script>
