<template>
  <div>
    <a href="#" class="store-locale" @click="$bus.$emit('modal-show', 'modal-switcher')">
      <!-- {{ $t('United States (US)') }} -->
      {{ country }} / {{ lang }} / {{ currency }}
    </a>
  </div>
</template>

<script>
import { currentStoreView } from '@vue-storefront/store/lib/multistore'

export default {
  data () {
    const storeView = currentStoreView()
    return {
      country: storeView.i18n.defaultCountry,
      lang: storeView.i18n.defaultLanguage,
      currency: storeView.i18n.currencyCode
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
