<template>
  <div>
    <header class="modal-header py25 px65 h1 serif weight-700 bg-cl-secondary">
      {{ $t('Reset password') }}
      <i
        slot="close"
        class="modal-close material-icons cl-bg-tertiary"
        @click="close"
      >
        close
      </i>
    </header>

    <div class="modal-content bg-cl-primary pt30 pb60 px65 cl-secondary">
      <template v-if="!passwordSent">
        <form @submit.prevent="sendEmail" novalidate>
          <div class="mb20">
            <p class="mb45">
              {{ $t('Enter your email to receive instructions on how to reset your password.') }}
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
            />
          </div>
          <button-full class="mb35" type="submit">
            {{ $t('Reset password') }}
          </button-full>
          <div class="center-xs">
            {{ $t('or') }}
            <a href="#" @click.prevent="switchElem">
              {{ $t('return to log in') }}
            </a>
          </div>
        </form>
      </template>
      <template v-if="passwordSent">
        <form class="py20">
          <p class="py30 mb80">
            {{ $t("We've sent password reset instructions to your email. Check your inbox and follow the link.") }}
          </p>
          <button-full class="mb35" type="link" @click.native="switchElem">
            {{ $t('Back to login') }}
          </button-full>
        </form>
      </template>
    </div>
  </div>
</template>

<script>

import ButtonFull from 'theme/components/theme/ButtonFull.vue'
import BaseInput from '../Form/BaseInput.vue'
import { required, email } from 'vuelidate/lib/validators'
import i18n from '@vue-storefront/i18n'

export default {
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
      // todo: send email with reset password instructions

      if (this.$v.$invalid) {
        this.$v.$touch()
        this.$store.dispatch('notification/spawnNotification', {
          type: 'error',
          message: i18n.t('Please fix the validation errors'),
          action1: { label: i18n.t('OK') }
        })
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
  },
  name: 'ForgotPass',
  data () {
    return {
      email: '',
      passwordSent: false
    }
  },
  components: {
    ButtonFull,
    BaseInput
  }
}
</script>

<style lang="scss" scoped>
  .modal-header{
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .modal-close{
    cursor: pointer;
  }
  .modal-content {
    @media (max-width: 400px) {
      padding-left: 20px;
      padding-right: 20px;
    }
  }
</style>
