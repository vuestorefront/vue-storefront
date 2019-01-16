<template>
  <div class="newsletter py25 px15 bg-cl-secondary">
    <div class="container">
      <div class="newsletter-content m0 row middle-sm start-md">
        <div class="col-md-9 col-xs-12">
          <h3 class="h3 cl-accent weight-400 m0">
            {{ $t('Subscribe to the newsletter and receive a coupon for 10% off') }}
          </h3>
        </div>
        <div class="newsletter-button col-md-3 col-xs-12 end-md">
          <button-outline
            @click.native="showNewsletterPopup"
            color="dark"
            data-testid="openNewsletterButton"
          >
            {{ $t('Subscribe') }}
          </button-outline>
        </div>
      </div>
    </div>
    <newsletter-popup v-if="loadNewsletterPopup"/>
  </div>
</template>

<script>
import ButtonOutline from 'theme/components/theme/ButtonOutline'
import { mapState } from 'vuex'
const NewsletterPopup = () => import(/* webpackChunkName: "vsf-newsletter-modal" */ 'theme/components/core/NewsletterPopup.vue')

export default {
  name: 'Newsletter',
  data () {
    return {
      loadNewsletterPopup: false
    }
  },
  computed: {
    ...mapState({
      isOpen: state => state.ui.newsletterPopup,
      isSubscribed: state => state.mailchimp.isSubscribed
    })
  },
  methods: {
    newsletterClick () {
      this.$store.commit('ui/setNewsletterPopup', !this.isOpen)
    },
    showNewsletterPopup () {
      this.loadNewsletterPopup = true
      this.$bus.$emit('modal-show', 'modal-newsletter')
    }
  },
  components: {
    ButtonOutline,
    NewsletterPopup
  }
}
</script>

<style scoped>
  @media (max-width: 1023px) {
    .newsletter-button {
      padding-top: 25px;
      text-align: center;
    }
  }

  @media (max-width: 767px) {
    .h3 {
      font-size: 18px;
      text-align: center;
    }
  }
</style>
