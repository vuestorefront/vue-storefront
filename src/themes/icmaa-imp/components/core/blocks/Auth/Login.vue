<template>
  <form class="" @submit.prevent="login" novalidate data-test-id="Login">
    <div v-if="hasRedirect" class="t-mb-4 t-text-sm">
      {{ $t('You need to be logged in to see this page') }}
    </div>
    <base-input
      class="t-mb-4" type="email" name="email" id="email" v-model="email"
      :placeholder="$t('E-mail address') + ' *'"
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
    <base-input
      class="t-mb-4"
      type="password"
      name="password"
      id="password"
      v-model="password"
      :placeholder="$t('Password') + ' *'"
      :validations="[
        {
          condition: !$v.password.required && $v.password.$error,
          text: $t('Field is required.')
        }
      ]"
    />
    <div class="t-flex t-items-center t-justify-between t-mb-4">
      <base-checkbox class="t-mr-4" id="remember" name="remember" v-model="remember">
        {{ $t('Remember me') }}
      </base-checkbox>
      <div href="#" @click.prevent="callForgotPassword" class="t-text-sm t-cursor-pointer">
        {{ $t('Forgot the password?') }}
      </div>
    </div>
    <button-component :submit="true" type="primary" class="t-w-full t-mb-2" data-test-id="loginSubmit">
      {{ $t('Login to your account') }}
    </button-component>
    <no-ssr>
      <facebook-login-button class="t-w-full t-mb-2" />
    </no-ssr>
    <button-component type="transparent" class="t-w-full t--mb-2" @click="callRegister" data-test-id="registerLink">
      {{ $t('Not yet an account?') }} <span class="t-ml-1">{{ $t('Register now') }}</span>
    </button-component>
  </form>
</template>

<script>
import i18n from '@vue-storefront/i18n'
import { Logger } from '@vue-storefront/core/lib/logger'

import { required, email } from 'vuelidate/lib/validators'

import BaseInput from 'theme/components/core/blocks/Form/BaseInput'
import BaseCheckbox from 'theme/components/core/blocks/Form/BaseCheckbox'
import ButtonComponent from 'theme/components/core/blocks/Button'
import FacebookLoginButton from 'theme/components/core/blocks/Auth/FacebookLoginButton'
import NoSSR from 'vue-no-ssr'

export default {
  name: 'Login',
  components: {
    BaseCheckbox,
    BaseInput,
    ButtonComponent,
    FacebookLoginButton,
    'no-ssr': NoSSR
  },
  data () {
    return {
      remember: false,
      email: '',
      password: '',
      hasRedirect: !!localStorage.getItem('redirect')
    }
  },
  validations: {
    email: {
      required,
      email
    },
    password: {
      required
    }
  },
  methods: {
    login () {
      if (this.$v.$invalid) {
        this.$v.$touch()
        this.$store.dispatch('notification/spawnNotification', {
          type: 'error',
          message: i18n.t('Please fix the validation errors'),
          action1: { label: i18n.t('OK') }
        })
        return
      }

      this.callLogin()
    },
    callLogin () {
      this.$bus.$emit('notification-progress-start', i18n.t('Please wait'))
      this.$store.dispatch('user/login', { username: this.email, password: this.password }).then((result) => {
        this.$bus.$emit('notification-progress-stop', {})

        if (result.code !== 200) {
          this.onFailure(result)
        } else {
          this.onSuccess()
          this.close()
        }
      }).catch(err => {
        Logger.error('Error whole login:', 'user', err)()
        this.onFailure({ result: 'Unexpected authorization error. Check your Network connection.' })
        this.$bus.$emit('notification-progress-stop')
      })
    },
    callRegister () {
      this.$store.commit('ui/setAuthElem', 'register')
    },
    callForgotPassword () {
      this.$store.commit('ui/setAuthElem', 'forgot-pass')
    },
    onSuccess () {
      this.$store.dispatch('notification/spawnNotification', {
        type: 'success',
        message: i18n.t('You are logged in!'),
        action1: { label: i18n.t('OK') }
      })
    },
    onFailure (result) {
      this.$store.dispatch('notification/spawnNotification', {
        type: 'error',
        message: i18n.t(result.result),
        action1: { label: i18n.t('OK') }
      })
    },
    close () {
      this.$bus.$emit('modal-hide', 'modal-signup')
    }
  }
}
</script>
