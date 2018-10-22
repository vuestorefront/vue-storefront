<template>
  <div>
    <header class="thank-you-title bg-cl-secondary py35 pl20">
      <div class="container">
        <breadcrumbs
          :routes="[{name: 'Homepage', route_link: '/'}]"
          :active-route="this.$t('Order confirmation')"
        />
        <h2 class="category-title">
          {{ $t('Order confirmation') }}
        </h2>
      </div>
    </header>
    <div class="thank-you-content align-justify py40 pl20">
      <div class="container">
        <div class="row">
          <div class="col-md-6 pl20 pr20">
            <h3 v-if="OnlineOnly" >
              {{ $t('Your purchase') }}
            </h3>
            <p v-if="OnlineOnly" v-html="this.$t('You have successfuly placed the order. You can check status of your order by using our <b>delivery status</b> feature. You will receive an order confirmation e-mail with details of your order and a link to track its progress.')" />
            <p v-if="OnlineOnly" v-html="this.$t('E-mail us at <b>demo@vuestorefront.io</b> with any questions, suggestions how we could improve products or shopping experience')"/>

            <h4 v-if="OfflineOnly">
              {{ $t('You are offline') }}
            </h4>
            <p v-if="OfflineOnly && !isNotificationSupported" >
              {{ $t('To finish the order just come back to our store while online. Your order will be sent to the server as soon as you come back here while online and then confirmed regarding the stock quantities of selected items') }}
            </p>
            <p v-if="OfflineOnly && isNotificationSupported && !isPermissionGranted" >
              {{ $t("You can allow us to remind you about the order via push notification after coming back online. You'll only need to click on it to confirm.") }}
            </p>
            <p v-if="OfflineOnly && isNotificationSupported && isPermissionGranted" >
              <strong>{{ $t('You will receive Push notification after coming back online. You can confirm the order by clicking on it') }}</strong>
            </p>
            <p v-if="!isPermissionGranted && isNotificationSupported">
              <button-outline color="dark" @click.native="requestNotificationPermission()" >
                {{ $t('Allow notification about the order') }}
              </button-outline>
            </p>
            <div id="thank-you-extensions"/>
            <h4>
              {{ $t('Your Account') }}
            </h4>
            <p v-html="this.$t('You can log to your account using e-mail and password defined earlier. On your account you can <b>edit your profile data,</b> check <b>history of transactions,</b> edit <b>subscription to newsletter.</b>')"/>
          </div>
          <div class="col-md-6 bg-cl-secondary thank-you-improvment">
            <h3>
              {{ $t('What we can improve?') }}
            </h3>
            <p class="mb25">
              {{ $t('Your feedback is important fo us. Let us know what we could improve.') }}
            </p>
            <form @submit.prevent="sendFeedback">
              <base-textarea
                class="mb25"
                type="text"
                name="body"
                v-model="feedback"
                :placeholder="$t('Type your opinion')"
                :autofocus="true"
              />
              <button-outline color="dark">
                {{ $t('Give a feedback') }}
              </button-outline>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import Composite from '@vue-storefront/core/mixins/composite'
import Breadcrumbs from 'theme/components/core/Breadcrumbs'
import BaseTextarea from 'theme/components/core/blocks/Form/BaseTextarea'
import ButtonOutline from 'theme/components/theme/ButtonOutline'
import VueOfflineMixin from 'vue-offline/mixin'
import { EmailForm } from '@vue-storefront/core/modules/mailer/components/EmailForm'

export default {
  name: 'ThankYouPage',
  mixins: [Composite, VueOfflineMixin, EmailForm],
  data () {
    return {
      feedback: ''
    }
  },
  computed: {
    isNotificationSupported () {
      if (Vue.prototype.$isServer || !('Notification' in window)) return false
      return 'Notification' in window
    },
    isPermissionGranted () {
      if (Vue.prototype.$isServer || !('Notification' in window)) return false
      return Notification.permission === 'granted'
    }
  },
  methods: {
    requestNotificationPermission () {
      if (Vue.prototype.$isServer) return false
      if ('Notification' in window && Notification.permission !== 'granted') {
        Notification.requestPermission()
      }
    },
    sendFeedback () {
      this.sendEmail(
        {
          sourceAddress: this.$store.state.checkout.personalDetails.emailAddress,
          targetAddress: this.$store.state.config.mailer.contactAddress,
          subject: this.$t('What we can improve?'),
          emailText: this.feedback
        },
        this.notifySuccess,
        this.notifyFailure
      )
    },
    notifySuccess (message) {
      this.$bus.$emit('notification', {
        type: 'success',
        message,
        action1: { label: this.$t('OK'), action: 'close' }
      })
      if (this.$store.state.config.mailer.sendConfirmation) {
        this.sendEmail(
          {
            sourceAddress: this.$store.state.config.mailer.contactAddress,
            targetAddress: this.$store.state.checkout.personalDetails.emailAddress,
            subject: this.$t('Confirmation of receival'),
            emailText: this.$t(`Dear customer,\n\nWe have received your letter.\nThank you for your feedback!`),
            confirmation: true
          }
        )
      }
    },
    notifyFailure (message) {
      this.$bus.$emit('notification', {
        type: 'error',
        message,
        action1: { label: this.$t('OK'), action: 'close' }
      })
    }
  },
  destroyed () {
    this.$store.dispatch('checkout/setThankYouPage', false)
  },
  components: {
    BaseTextarea,
    Breadcrumbs,
    ButtonOutline
  }
}
</script>

<style lang="scss">
  .thank-you-content {
    padding-left: 0;

    p {
      line-height: 25px
    }

    @media (min-width: 64em) {
      h4 {
        font-size: 24px;
      }
    }
  }
  .thank-you-improvment {
    padding: 0 20px 15px;

    @media (min-width: 64em) {
      padding: 0 40px 10px;
    }

    textarea {
      min-height: 100px;
    }
  }
</style>
