<template>
  <div class="newsletter" v-if="!isSubscribed">
    <h4 class="t-text-primary t-text-lg t-font-bold t-mb-2">
      {{ $t("Get your 5€ Voucher") }}
    </h4>
    <p class="t-text-sm t-mb-3 t-leading-tight">
      {{ $t("Get the Impericon Newsletter & and get yourself a 5€ gift.") }}
    </p>
    <div class="t-flex t-mb-2 ">
      <input type="text" value="" :placeholder="$t('Your email address')" @focus="showNewsletterPopup" class="t-flex t-flex-expand t-border t-border-r-0 t-border-base-light t-rounded-none t-rounded-tl-sm t-rounded-bl-sm t-text-sm t-h-10 t-px-2 t-leading-tight placeholder:t-text-base-light">
      <button type="submit" @click="showNewsletterPopup" class="t-flex t-rounded-none t-border t-border-l-0 t-border-base-light t-rounded-tr-sm t-rounded-br-sm t-text-base-tone t-pr-2">
        <material-icon icon="send" />
        <span class="t-sr-only">{{ $t('Submit') }}</span>
      </button>
    </div>
    <i18n path="Data is not given to third parties and unsubscription is possible at any time. {policy}" tag="p" class="t-text-xs t-text-base-light t-leading-none t-mb-4">
      <a place="policy" href="/policy">{{ $t('Privacy Policy') }}</a>
    </i18n>
    <newsletter-popup v-if="loadNewsletterPopup" />
  </div>
</template>

<script>
import SubscriptionStatus from '@vue-storefront/core/modules/newsletter/mixins/SubscriptionStatus'
import MaterialIcon from 'theme/components/core/blocks/MaterialIcon'
const NewsletterPopup = () => import(/* webpackChunkName: "vsf-newsletter-modal" */ 'theme/components/core/NewsletterPopup.vue')

export default {
  name: 'Newsletter',
  components: {
    MaterialIcon,
    NewsletterPopup
  },
  mixins: [ SubscriptionStatus ],
  data () {
    return {
      loadNewsletterPopup: false
    }
  },
  methods: {
    showNewsletterPopup () {
      this.loadNewsletterPopup = true
      this.$bus.$emit('modal-show', 'modal-newsletter')
    }
  }
}
</script>
