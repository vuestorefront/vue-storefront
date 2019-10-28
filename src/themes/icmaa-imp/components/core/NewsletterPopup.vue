<template>
  <modal name="modal-newsletter" :title="$t('Newsletter')" width="400">
    <form @submit.prevent="subscribe(onSuccesfulSubmission)" novalidate>
      <p class="t-text-sm t-mb-4">
        {{ $t('Sign up to our newsletter and receive a coupon for 10% off!') }}
      </p>
      <base-input
        focus
        type="email"
        name="email"
        v-model="email"
        class="t-mb-4"
        :placeholder="$t('E-mail address *')"
        :validations="[
          {
            condition: $v.email.$error && !$v.email.required,
            text: $t('Field is required.')
          },
          {
            condition: !$v.email.email && $v.email.$error,
            text: $t('Please provide valid e-mail address.')
          }
        ]"
      />
      <button-component class="t-w-full" type="primary" :submit="true" @click="$v.email.$touch">
        {{ $t('Subscribe') }}
      </button-component>
    </form>
  </modal>
</template>
<script>
import SubscriptionStatus from '@vue-storefront/core/modules/newsletter/mixins/SubscriptionStatus'
import Subscribe from '@vue-storefront/core/modules/newsletter/mixins/Subscribe'
import i18n from '@vue-storefront/i18n'

import Modal from 'theme/components/core/Modal'
import BaseInput from 'theme/components/core/blocks/Form/BaseInput'
import ButtonComponent from 'theme/components/core/blocks/Button'

export default {
  mounted () {
    this.$nextTick(() => {
      this.$bus.$emit('modal-show', 'modal-newsletter')
    })
  },
  beforeDestroy () {
    this.$off('validation-error')
  },
  methods: {
    onSuccesfulSubmission (isSubscribed) {
      if (isSubscribed) {
        this.$store.dispatch('notification/spawnNotification', {
          type: 'success',
          message: i18n.t('You have been successfully subscribed to our newsletter!'),
          action1: { label: i18n.t('OK') }
        })
      }

      this.$bus.$emit('modal-hide', 'modal-newsletter')
    }
  },
  components: {
    ButtonComponent,
    Modal,
    BaseInput
  },
  mixins: [
    SubscriptionStatus, Subscribe
  ]
}
</script>
