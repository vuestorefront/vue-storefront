<template>
  <div class="t-p-4 t-bg-white">
    <headline icon="alarm_on">
      {{ $t('My product-alerts') }}
    </headline>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Headline from 'theme/components/core/blocks/MyAccount/Headline'
import i18n from '@vue-storefront/i18n'

export default {
  name: 'MyProductAlerts',
  components: {
    Headline
  }
}
</script>
