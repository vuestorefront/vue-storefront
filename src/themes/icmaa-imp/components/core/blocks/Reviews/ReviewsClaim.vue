<template>
  <transition name="fade">
    <div class="reviews-claim t-p-8 t-bg-alt-1 t-text-white t-text-xs" :class="[ reviewsCount > 0 ? 't-w-full t-absolute t-left-0 t-bottom-0' : 't--mx-8 t--mb-8 t-mt-8' ]" v-if="isOpen">
      <h4 class="t-text-lg t-mb-2">
        {{ $t('Write a review and get a {voucher} voucher!', { voucher }) }}
      </h4>
      <p class="t-mb-4">
        {{ $t('Leave us a 50 words review and win one of three {voucher} vouchers each month.', { voucher }) }}
      </p>
      <div class="t-flex">
        <button-component type="ghost-white" @click.native="accept">
          {{ $t('Add review') }}
        </button-component>
        <button-component type="transparent-white" icon="close" :icon-only="true" @click.native="close">
          {{ $t('Close') }}
        </button-component>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapGetters } from 'vuex'

import i18n from '@vue-storefront/i18n'
import { price } from '@vue-storefront/core/filters/price'
import ButtonComponent from 'theme/components/core/blocks/Button'

export default {
  components: {
    ButtonComponent
  },
  data () {
    return {
      isOpen: false
    }
  },
  computed: {
    ...mapGetters({
      reviewsCount: 'review/getReviewsCount',
      storeConfig: 'icmaaConfig/getCurrentStoreConfig'
    }),
    voucher () {
      const config = this.storeConfig
      if (config.reviews && config.reviews.voucher_value) {
        return config.reviews.voucher_value
      }

      return price(50)
    }
  },
  methods: {
    accept () {
      this.$bus.$emit('reviews-open-form')
      this.close()
    },
    close () {
      this.$store.dispatch('claims/set', { claimCode: 'reviewsClaimAccepted', value: true })
      this.isOpen = false
    }
  },
  created () {
    this.$store.dispatch('claims/check', { claimCode: 'reviewsClaimAccepted' })
      .then(claim => {
        if (!claim) {
          this.isOpen = true
          this.$store.dispatch('claims/set', { claimCode: 'reviewsClaimAccepted', value: false })
        } else {
          this.isOpen = !claim.value
        }
      })
  }
}
</script>
