<template>
  <div>
    <a href="#" class="store-locale" @click.prevent="showLanguagesModal">
      {{ country }} / {{ lang }} / {{ currency }}
    </a>
    <modal-switcher v-if="loadLanguagesModal" />
  </div>
</template>

<script>
import { currentStoreView } from '@vue-storefront/core/lib/multistore'
const ModalSwitcher = () => import(/* webpackChunkName: "vsf-languages-modal" */ 'theme/components/core/blocks/Switcher/Language.vue')

export default {
  components: {
    ModalSwitcher
  },
  data () {
    const storeView = currentStoreView()
    return {
      country: storeView.i18n.defaultCountry,
      lang: storeView.i18n.defaultLanguage,
      currency: storeView.i18n.currencyCode,
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

<style lang="scss" scoped>

</style>
