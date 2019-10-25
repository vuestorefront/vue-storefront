<template>
  <transition name="fade" appear>
    <div class="cookie t-fixed t-bottom-0 t-w-full t-bg-base-tone" v-if="isOpen">
      <div class="t-container">
        <div class="t-flex t-flex-wrap t-justify-start lg:t-justify-center t-items-center t-px-4 t-py-4 t-text-sm t-text-white">
          <div class="t-w-full t-mb-2 lg:t-w-auto lg:t-mb-0 t-mr-4 t-leading-tight">
            {{ message }}<br>
            <span class="t-hidden lg:t-inline t-text-xs t-text-base-lighter t-font-thin">{{ messageSub }}</span>
          </div>
          <button-component size="sm" type="ghost-white" icon="check" @click="accept">
            {{ $t('Accept') }}
          </button-component>
          <button-component size="sm" type="transparent-white" icon="info" :icon-only="true" @click="$router.push(localizedRoute(detailsLink))">
            {{ detailsLinkText }}
          </button-component>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import i18n from '@vue-storefront/i18n'
import ButtonComponent from 'theme/components/core/blocks/Button'

export default {
  name: 'CookieNotification',
  components: {
    ButtonComponent
  },
  props: {
    detailsLinkText: {
      type: String,
      default: i18n.t('See details')
    },
    detailsLink: {
      type: String,
      default: '/service-imprint'
    },
    message: {
      type: String,
      default: i18n.t('We are using cookies to give you the best experience on our site.')
    },
    messageSub: {
      type: String,
      default: i18n.t('By continuing to use our website without changing the settings, you are agreeing to our use of cookies.')
    }
  },
  data () {
    return {
      isOpen: false
    }
  },
  methods: {
    accept () {
      this.setVisited()
      this.isOpen = false
    },
    setVisited () {
      this.$store.dispatch('claims/set', {claimCode: 'cookiesAccepted', value: true})
    }
  },
  created () {
    this.$store.dispatch('claims/check', {claimCode: 'cookiesAccepted'}).then((cookieClaim) => {
      if (!cookieClaim) {
        this.isOpen = true
        this.$store.dispatch('claims/set', {claimCode: 'cookiesAccepted', value: false})
      } else {
        this.isOpen = !cookieClaim.value
      }
    })
  }
}
</script>
