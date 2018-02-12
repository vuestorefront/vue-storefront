<template>
  <div>
    <div class="py35 px65 bg-lightgray">
      <h1 class="my0">
        {{ $t('Log in') }}
      </h1>
    </div>
    <div class="py35 px65 bg-white c-gray">
      <form @submit.prevent="login" novalidate>
        <div class="mb35">
          <input
            class="py10 w-100 border-box brdr-none brdr-bottom brdr-c-lightgray-secondary h4 weight-200 sans-serif"
            type="email"
            name="email"
            ref="email"
            v-model="email"
            placeholder="E-mail address *"
          >
          <span class="validation-error block h6 c-red" v-if="!$v.email.required">Field is required.</span>
          <span class="validation-error block h6 c-red" v-if="!$v.email.email">Please provide valid e-mail address.</span>
        </div>
        <div class="mb35 relative">
          <input
            class="py10 w-100 border-box brdr-none brdr-bottom brdr-c-lightgray-secondary h4 weight-200 sans-serif"
            :type="passType"
            name="password"
            v-model="password"
            placeholder="Password *"
          >
          <i class="icon material-icons c-alto absolute pointer" @click="togglePassType">{{ iconName }}</i>
          <span class="validation-error block h6 c-red" v-if="!$v.password.required">Field is required.</span>
        </div>
        <div class="row">
          <div class="col-xs-6 mb35">
            <input class="m5" type="checkbox" name="remember" id="remember">
            <label for="remember">
              {{ $t('Remember me') }}
            </label>
          </div>
          <div class="col-xs-6 mb35 align-right">
            <a href="#" @click.prevent="remindPassword">
              {{ $t('Forgot the password?') }}
            </a>
          </div>
        </div>
        <div class="mb20">
          <button-full class="w-100 border-box p0 center-xs" text="Log in to your account" @click.native="login"/>
        </div>
        <input class="hidden" type="submit">
        <div class="center-xs">
          <span>
            or
            <a href="#" @click.prevent="switchElem">
              {{ $t('register an account') }}
            </a>
          </span>
        </div>
      </form>
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
      passType: 'password',
      iconName: 'visibility',
      email: '',
      password: ''
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
  mixins: [coreComponent('core/blocks/Auth/Login')],
  methods: {
    switchElem () {
      this.$store.commit('ui/setAuthElem', 'register')
    },
    togglePassType (name) {
      if (this.passType === 'password') {
        this.passType = 'text'
        this.iconName = 'visibility_off'
      } else {
        this.passType = 'password'
        this.iconName = 'visibility'
      }
    },
    remindPassword () {
      if (!(typeof navigator !== 'undefined' && navigator.onLine)) {
        this.$bus.$emit('notification', {
          type: 'error',
          message: i18n.t('Reset password feature does not work while offline!'),
          action1: { label: 'OK', action: 'close' }
        })
      } else {
        this.$store.commit('ui/setAuthElem', 'forgot-pass')
      }
    },
    login () {
      if (this.$v.$invalid) {
        this.$bus.$emit('notification', {
          type: 'error',
          message: i18n.t('Please fix the validation errors'),
          action1: { label: 'OK', action: 'close' }
        })
        return
      }

      this.$bus.$emit('notification-progress-start', i18n.t('Authorization in progress ...'))
      this.$store.dispatch('user/login', { username: this.email, password: this.password }).then((result) => {
        console.log(result)
        this.$bus.$emit('notification-progress-stop', {})

        if (result.code !== 200) {
          this.$bus.$emit('notification', {
            type: 'error',
            message: i18n.t(result.result),
            action1: { label: 'OK', action: 'close' }
          })
        } else {
          this.$bus.$emit('notification', {
            type: 'success',
            message: i18n.t('You are logged in!'),
            action1: { label: 'OK', action: 'close' }
          })
          this.$store.commit('ui/setSignUp', false)
        }
      }).catch(err => {
        console.error(err)
        this.$bus.$emit('notification-progress-stop')
      })
    }
  },
  mounted () {
    this.$refs.email.focus()
  },
  components: {
    ButtonFull
  }
}
</script>

<style lang="scss" scoped>
  @import '~theme/css/base/global_vars';
  $lightgray-secondary: map-get($colors, lightgray-secondary);
  $gray: map-get($colors, gray);
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

  .icon {
    right: 0;
    top: 10px;

    &:hover {
      color: $gray;
    }
  }
</style>
