<template>
  <div class="t-hidden sm:t-flex t-border-l t-border-base-tone t-items-stretch">
    <div class="t-flex t-items-center t-cursor-pointer  t-px-4" @click="showLanguagesModal">
      <flag-icon :iso="country" width="20" height="20" class="t-flex t-w-6 t-h-6 t-rounded-full t-border t-border-base-tone" />
    </div>
  </div>
</template>

<script>
import { currentStoreView } from '@vue-storefront/core/lib/multistore'
import FlagIcon from 'theme/components/core/blocks/FlagIcon'

export default {
  components: {
    FlagIcon
  },
  data () {
    const storeView = currentStoreView()
    return {
      country: storeView.i18n.defaultCountry
    }
  },
  methods: {
    showLanguagesModal () {
      this.$bus.$emit('modal-toggle-switcher')
    }
  }
}
</script>
