<template>
  <layout id="newsletter-page" :headline="content.headline">
    <div class="newsletter t-p-4 lg:t-p-8 lg:t-w-1/2 t-bg-white t-m-4 lg:t-my-8 lg:t-container lg:t-mx-auto" data-test-id="Newsletter">
      <h1 class="t-text-2xl t-font-medium t-mb-3 t-text-primary">
        {{ $t("Get the Impericon Newsletter & and get yourself a 5€ gift.") }}
      </h1>

      <ul class="t-my-4 t-py-4 t-border-t t-border-base-lighter">
        <li class="why-item t-my-2" v-for="(why, index) in content.whys" :key="index">
          <i class="t-text-base-lighter t-ml-2 material-icons t-text-4xl t-align-middle">keyboard_arrow_right</i>
          {{ why.point }}
        </li>
      </ul>

      <div class="t-flex t-mb-2 ">
        <input type="text" value="" :placeholder="$t('Your email address')" @focus="showNewsletterPopup" class="t-flex t-flex-expand t-border t-border-r-0 t-border-base-light t-rounded-none t-rounded-tl-sm t-rounded-bl-sm t-text-sm t-h-10 t-px-2 t-leading-tight placeholder:t-text-base-light">
        <button type="submit" @click="showNewsletterPopup" class="t-flex t-rounded-none t-border t-border-l-0 t-border-base-light t-rounded-tr-sm t-rounded-br-sm t-text-base-tone t-pr-2 t-bg-white">
          <material-icon icon="send" />
          <span class="t-sr-only">{{ $t('Submit') }}</span>
        </button>
      </div>
      <p class="t-text-base-light t-text-xs" v-html="content.hint" />
      <newsletter-popup v-if="loadNewsletterPopup" />
    </div>
  </layout>
</template>

<script>
import Page from 'icmaa-cms/mixins/Page'
import SubscriptionStatus from '@vue-storefront/core/modules/newsletter/mixins/SubscriptionStatus'
import MaterialIcon from 'theme/components/core/blocks/MaterialIcon'
const NewsletterPopup = () => import(/* webpackChunkName: "vsf-newsletter-modal" */ 'theme/components/core/NewsletterPopup.vue')

export default {
  name: 'Newsletter',
  components: {
    MaterialIcon,
    NewsletterPopup
  },
  mixins: [ Page, SubscriptionStatus ],
  data () {
    return {
      loadNewsletterPopup: false,
      dataType: 'yaml'
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
