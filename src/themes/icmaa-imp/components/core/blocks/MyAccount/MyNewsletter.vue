<template>
  <div class="t-p-4 t-bg-white">
    <headline icon="mail">
      {{ $t('My newsletter') }}
    </headline>
    <base-checkbox class="t-w-full t-px-2 t-mb-4" id="generalAgreement" v-model="isSubscribed">
      {{ $t('I want to receive a newsletter, and agree to its terms') }}
    </base-checkbox>
    <div class="t-w-full t-px-2">
      <button-component type="primary" @click.native="updateNewsletter" class="t-w-full lg:t-w-auto">
        {{ $t('Update my preferences') }}
      </button-component>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Headline from 'theme/components/core/blocks/MyAccount/Headline'
import BaseCheckbox from '../Form/BaseCheckbox.vue'
import i18n from '@vue-storefront/i18n'
import ButtonComponent from 'theme/components/core/blocks/Button'

export default {
  name: 'MyNewsletter',
  components: {
    ButtonComponent,
    BaseCheckbox,
    Headline
  },
  data () {
    return {
      isSubscribed: false,
      text_unsubscribe: 'You have been successfully unsubscribed from our newsletter!',
      text_subscribe: 'We are almost done. A confirmation email has been send to your email address.'
    }
  },
  mounted () {
    this.isSubscribed = this.customer ? this.getIsSubscribed : false
  },
  computed: {
    ...mapGetters({
      getIsSubscribed: 'newsletter/isSubscribed',
      customer: 'user/getCustomer'
    })
  },
  methods: {
    updateNewsletter () {
      const message = this.isSubscribed ? this.text_unsubscribe : this.text_subscribe
      const customer = Object.assign({}, this.customer, { is_subscribed: this.isSubscribed })
      this.$bus.$emit('myAccount-before-updateUser', customer, false, message)
    }
  }
}
</script>
