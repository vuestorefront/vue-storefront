<template>
  <div v-if="validStatus" @click="followTracking">
    <slot>
      {{ $t('Shipment tracking') }}
    </slot>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import config from 'config'
import i18n from '@vue-storefront/i18n'

export default {
  name: 'TrackingLink',
  props: {
    orderId: {
      type: [Number, String],
      required: true
    },
    status: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapGetters({ getTracking: 'icmaaTracking/getTrackingByOrderId' }),
    tracking () {
      return this.getTracking(this.orderId)
    },
    validStatus () {
      return config.icmaa_tracking.orderStatusWhitelist.includes(this.status)
    }
  },
  methods: {
    async followTracking () {
      this.$bus.$emit('notification-progress-start', i18n.t('Please wait'))
      await this.$store.dispatch('icmaaTracking/fetchTracking', this.orderId)
      if (this.tracking) {
        window.open(this.tracking.url, '_blank')
      }
      this.$bus.$emit('notification-progress-stop')
    }
  }
}

</script>
