<template>
  <modal name="modal-newsletter" :width="450">
    <p slot="header">
      {{ $t('Newsletter') }}
    </p>
    <div slot="content">
      <form @submit.prevent="subscribe" novalidate>
        <div class="mb35">
          <p class="h4">
            {{ $t('Sign up to our newsletter and receive a coupon for 10% off!') }}
          </p>
          <base-input
            focus
            type="email"
            name="email"
            v-model="email"
            autocomplete="email"
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
        </div>
        <button-full
          class="mb35"
          type="submit"
          @click.native="$v.email.$touch"
        >
          {{ $t('Subscribe') }}
        </button-full>
      </form>
    </div>
  </modal>
</template>
<script>
import ButtonFull from 'theme/components/theme/ButtonFull.vue'
import Modal from 'theme/components/core/Modal'
import BaseInput from 'theme/components/core/blocks/Form/BaseInput.vue'
import { required, email } from 'vuelidate/lib/validators'
import i18n from '@vue-storefront/core/lib/i18n'

export default {
  data () {
    return {
      email: ''
    }
  },
  validations: {
    email: {
      required,
      email
    }
  },
  mounted () {
    if (this.$store.state.user.current) {
      this.email = this.$store.state.user.current.email
    }
  },
  methods: {
    subscribe () {
      if (this.$v.$invalid) {
        this.$bus.$emit('notification', {
          type: 'error',
          message: i18n.t('Please fix the validation errors'),
          action1: { label: i18n.t('OK'), action: 'close' }
        })
        return
      }

      // todo: add user email to newsletter list
      this.$bus.$emit('newsletter-after-subscribe', { email: this.email })

      this.$bus.$emit('notification', {
        type: 'success',
        message: i18n.t('You have been successfully subscribed to our newsletter!'),
        action1: { label: i18n.t('OK'), action: 'close' }
      })

      this.$bus.$emit('modal-hide', 'modal-newsletter')
    }
  },
  components: {
    ButtonFull,
    Modal,
    BaseInput
  }
}
</script>
