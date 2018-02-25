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
          <input
            class="border-box w-100 brdr-none brdr-bottom brdr-cl-brdr-primary py10 h4 weight-200"
            autofocus
            type="email"
            name="email"
            v-model="email"
            autocomplete="email"
            :placeholder="$t('E-mail address *')"
          >
          <p class="m0 c-red h6" v-if="$v.email.$error && !$v.email.required">Field is required.</p>
          <p class="m0 c-red h6" v-if="!$v.email.email && $v.email.$error">Please provide valid e-mail address.</p>
        </div>
        <div class="mb35 center-xs">
          <button-full
            type="submit"
            @click.native="$v.email.$touch"
          >
            {{ $t('Subscribe') }}
          </button-full>
        </div>
      </form>
    </div>
  </modal>
</template>
<script>
import ButtonFull from 'theme/components/theme/ButtonFull.vue'
import Modal from 'theme/components/core/Modal'
import { required, email } from 'vuelidate/lib/validators'
import i18n from 'core/lib/i18n'

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
  methods: {
    subscribe () {
      if (this.$v.$invalid) {
        this.$bus.$emit('notification', {
          type: 'error',
          message: i18n.t('Please fix the validation errors'),
          action1: { label: 'OK', action: 'close' }
        })
        return
      }

      // todo: add user email to newsletter list
      this.$bus.$emit('newsletter-after-subscribe', { email: this.email })

      this.$bus.$emit('notification', {
        type: 'success',
        message: i18n.t('You have been successfully subscribed to our newsletter!'),
        action1: { label: 'OK', action: 'close' }
      })

      this.$bus.$emit('modal-hide', 'modal-newsletter')
    }
  },
  components: {
    ButtonFull,
    Modal
  }
}
</script>
<style lang="scss" scoped>
  @import '~theme/css/base/global_vars';
  $lightgray-secondary: map-get($colors, lightgray-secondary);
  $black: map-get($colors, black);

  input::-webkit-input-placeholder,
  input::-moz-placeholder {
    color: $lightgray-secondary;
  }

  input:focus {
    outline: none;
    border-color: $black;
    transition: 0.3s all;
  }
</style>
