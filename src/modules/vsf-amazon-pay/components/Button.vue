<template>
  <div :id="id" />
</template>

<script>
import config from 'config'
import i18n from '@vue-storefront/i18n'
import { KEY } from '../index'

const TYPE_LOGIN = 'LwA'
const TYPE_PAY = 'PwA'

// TODO: add login button functionality
export default {
  name: 'AmazonPayButton',
  props: {
    type: {
      type: String,
      required: true,
      validator: function (value) {
        return [TYPE_PAY].indexOf(value) !== -1
      }
    },
    color: {
      type: String,
      required: false,
      default: 'Gold',
      validator: function (value) {
        return ['Gold', 'LightGray', 'DarkGray'].indexOf(value) !== -1
      }
    },
    size: {
      type: String,
      required: false,
      default: 'medium',
      validator: function (value) {
        return ['small', 'medium', 'large', 'x-large'].indexOf(value) !== -1
      }
    },
    popup: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  data () {
    return {
      id: 'amazon-pay-button',
      isSet: false
    }
  },
  mounted () {
    if (config.amazonPay) {
      if (this.$store.state[KEY].amazonPaymentsReady) {
        this.setupWidget()
      } else {
        this.$bus.$on('amazon-payments-ready', this.setupWidget)
      }
    }
  },
  methods: {
    setupWidget () {
      if (!this.isSet) {
        this.isSet = true
        window.OffAmazonPayments.Button(this.id, config.amazonPay.merchantId, {
          type: this.type,
          color: this.color,
          size: this.size,
          authorization: this.authorization,
          onError: this.onError
        })
      }
    },
    onError (error) {
      console.error(error.getErrorCode(), error.getErrorMessage())
    },
    authorization () {
      window.amazon.Login.authorize({
        scope: this.type === TYPE_LOGIN ? 'profile' : 'profile payments:widget payments:shipping_address',
        popup: this.popup
      }, this.onAuthorize)
    },
    onAuthorize (response) {
      this.$bus.$emit('notification-progress-start', i18n.t('Authorization in progress ...'))
      let decodedAccessToken = decodeURIComponent(response.access_token)
      this.$store.dispatch(KEY + '/setUserToken', {
        token: {
          token: decodedAccessToken,
          expire_at: Date.now() + (response.expires_in * 1000)
        },
        useCache: true
      })

      switch (this.type) {
        case TYPE_LOGIN:
          // TODO: handle login
          // this.$store.dispatch(KEY + '/getLoginProfile', response.access_token).then(response => {
          // })
          this.$bus.$emit('notification-progress-stop')
          break

        case TYPE_PAY:
          this.$bus.$emit('notification-progress-stop')
          break
      }
      this.$bus.$emit('amazon-authorized', { type: this.type, response })
      this.$emit('authorized', { type: this.type, response })
    }
  }
}
</script>
