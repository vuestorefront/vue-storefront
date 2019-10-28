<template>
  <form @submit.prevent="sendEmail" novalidate v-if="!passwordSent">
    <p class="t-text-sm t-mb-4">
      {{ $t('Enter your email address. After submit you will receive an email with an reset-link.') }}
    </p>
    <base-input
      type="email"
      name="email"
      v-model="email"
      focus
      :placeholder="$t('E-mail address *')"
      :validations="[
        {
          condition: !$v.email.required && $v.email.$error,
          text: $t('Field is required.')
        },
        {
          condition: !$v.email.email && $v.email.$error,
          text: $t('Please provide valid e-mail address.')
        }
      ]"
      class="t-mb-4"
    />
    <button-component :submit="true" type="primary" class="t-w-full t-mb-2">
      {{ $t('Reset password') }}
    </button-component>
    <button-component type="transparent" class="t-w-full t--mb-2" @click="switchElem">
      {{ $t('Return to log in') }}
    </button-component>
  </form>
  <div v-else>
    <p class="t-mb-4">
      {{ $t("We've sent password reset instructions to your email. Check your inbox and follow the link.") }}
    </p>
    <button-component class="t-w-full" @click="switchElem">
      {{ $t('Back to login') }}
    </button-component>
  </div>
</template>

<script>

import i18n from '@vue-storefront/i18n'
import { required, email } from 'vuelidate/lib/validators'
import BaseInput from 'theme/components/core/blocks/Form/BaseInput'
import ButtonComponent from 'theme/components/core/blocks/Button'

export default {
  name: 'ForgotPass',
  data () {
    return {
      email: '',
      passwordSent: false
    }
  },
  components: {
    BaseInput,
    ButtonComponent
  },
  validations: {
    email: {
      required,
      email
    }
  },
  methods: {
    close () {
      this.$bus.$emit('modal-hide', 'modal-signup')
    },
    sendEmail () {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      this.$bus.$emit('notification-progress-start', i18n.t('Resetting the password ... '))
      this.$store.dispatch('user/resetPassword', { email: this.email }).then((response) => {
        this.$bus.$emit('notification-progress-stop')
        if (response.code === 200) {
          this.passwordSent = true
        } else {
          this.$store.dispatch('notification/spawnNotification', {
            type: 'error',
            message: i18n.t(response.result) || i18n.t('Error while sending reset password e-mail'),
            action1: { label: i18n.t('OK'), action: 'close' }
          })
        }
      }).catch((err) => {
        console.error(err)
        this.$bus.$emit('notification-progress-stop')
      })
    },
    switchElem () {
      this.$store.commit('ui/setAuthElem', 'login')
    }
  }
}
</script>
