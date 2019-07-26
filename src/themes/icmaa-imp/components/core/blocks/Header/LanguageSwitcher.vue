<template>
  <div class="t-hidden sm:t-flex t-border-l t-border-base t-items-stretch">
    <div class="t-flex t-items-center t-cursor-pointer  t-px-4" @click="showLanguagesModal">
      <flag-icon :iso="country" width="20" height="20" class="t-flex t-w-5 t-h-5 t-rounded-full t-border t-border-base" />
    </div>
    <modal-switcher v-if="loadLanguagesModal" />
  </div>
</template>

<script>
import { currentStoreView } from '@vue-storefront/core/lib/multistore'
import FlagIcon from 'theme/components/core/blocks/FlagIcon'
const ModalSwitcher = () => import(/* webpackChunkName: "vsf-languages-modal" */ 'theme/components/core/blocks/Switcher/Language.vue')

export default {
  components: {
    FlagIcon,
    ModalSwitcher
  },
  data () {
    const storeView = currentStoreView()
    return {
      country: storeView.i18n.defaultCountry,
      loadLanguagesModal: false
    }
  },
  methods: {
    showLanguagesModal () {
      this.loadLanguagesModal = true
      this.$bus.$emit('modal-show', 'modal-switcher')
    }
  }
}
</script>
