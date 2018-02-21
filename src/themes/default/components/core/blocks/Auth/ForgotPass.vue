<template>
  <div>
    <header class="modal-header py25 px65 h1 serif weight-700 bg-lightgray">
      <i slot="close" class="modal-close material-icons p15 c-gray" @click="close">close</i>
      {{ $t('Reset password') }}
    </header>

    <div class="modal-content pt30 pb60 px65 c-gray-secondary">
      <template v-if="!passwordSent">
        <form @submit.prevent="sendEmail" novalidate>
          <div class="mb35">
            <p class="mb45">
              {{ $t('Enter your email to receive instructions on how to reset your password.') }}
            </p>
            <input
              ref="email"
              class="brdr-none brdr-bottom brdr-c-lightgray-secondary border-box py10 w-100 h4 weight-200 sans-serif"
              type="email"
              name="email"
              v-model="email"
              placeholder="E-mail address *"
            >
            <p class="m0 c-red h6" v-if="!$v.email.required && $v.email.$error">Field is required.</p>
            <p class="m0 c-red h6" v-if="!$v.email.email && $v.email.$error">Please provide valid e-mail address.</p>
          </div>
          <div class="mb35">
            <button-full type="submit">
              {{ $t('Reset password') }}
            </button-full>
          </div>
          <div class="center-xs">
            <span>
              {{ $t('or') }}
              <a href="#" @click.prevent="switchElem">
                {{ $t('return to log in') }}
              </a>
            </span>
          </div>
        </form>
      </template>
      <template v-if="passwordSent">
        <form class="py20">
          <div class="py30 mb35">
            <p class="mb45">
              {{ $t("We've sent password reset instructions to your email. Check your inbox and follow the link.") }}
            </p>
          </div>
          <div class="mb35">
            <button-full type="submit">
              {{ $t('Back to login') }}
            </button-full>
          </div>
        </form>
      </template>
    </div>
  </div>
</template>

<script>
import { coreComponent } from 'lib/themes'

import ButtonFull from 'theme/components/theme/ButtonFull.vue'
import { required, email } from 'vuelidate/lib/validators'
import i18n from 'lib/i18n'

export default {
  data () {
    return {
      email: '',
      passwordSent: false
    }
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
      // todo: send email with reset password instructions

      if (this.$v.$invalid) {
        this.$v.$touch()
        this.$bus.$emit('notification', {
          type: 'error',
          message: 'Please fix the validation errors',
          action1: { label: 'OK', action: 'close' }
        })
        return
      }

      this.$bus.$emit('notification-progress-start', i18n.t('Reseting the password ... '))
      this.$store.dispatch('user/resetPassword', { email: this.email }).then((response) => {
        this.$bus.$emit('notification-progress-stop')
        if (response.code === 200) {
          this.passwordSent = true
        } else {
          this.$bus.$emit('notification', {
            type: 'error',
            message: i18n.t(response.result) || i18n.t('Error while sending reset password e-mail'),
            action1: { label: 'OK', action: 'close' }
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
  mounted () {
    this.$refs.email.focus()
  },
  mixins: [coreComponent('blocks/Auth/ForgotPass')],
  components: {
    ButtonFull
  }
}
</script>

<style lang="scss" scoped>
  @import '~theme/css/base/global_vars';
  $lightgray-secondary: map-get($colors, lightgray-secondary);
  $black: map-get($colors, black);

  input::-webkit-input-placeholder {
    color: $lightgray-secondary;
  }

  input:-moz-placeholder {
    color: $lightgray-secondary;
  }

  input:focus {
    outline: none;
    border-color: $black;
    transition: 0.3s all;
  }
</style>
