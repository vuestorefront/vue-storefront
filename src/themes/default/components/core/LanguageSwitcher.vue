<template>
  <div>
    <a href="#" class="store-locale" @click="$bus.$emit('modal-show', 'modal-switcher')">
      <!-- {{ $t('United States (US)') }} -->
      {{ country }} / {{ lang }} / {{ currency }}
    </a>
  </div>
</template>

<script>
import config from 'config'

export default {
  data () {
    return {
      country: config.i18n.defaultCountry,
      lang: config.i18n.defaultLanguage,
      currency: config.i18n.currencyCode
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
