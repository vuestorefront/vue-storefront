<template>
  <div>
    <header class="modal-header py25 px65 h1 serif weight-700 bg-cl-secondary">
      <i slot="close" class="modal-close material-icons p15 cl-bg-tertiary" @click="close">close</i>
      {{ $t('Log in') }}
    </header>
    <div class="modal-content pt30 pb60 px65  cl-secondary">
      <form @submit.prevent="login" novalidate>
        <div class="mb35">
          <input
            class="py10 w-100 border-box brdr-none brdr-bottom brdr-cl-primary h4 weight-200 sans-serif"
            type="email"
            name="email"
            ref="email"
            v-model="email"
            :placeholder="$t('E-mail address *')"
          >
          <span class="validation-error block h6 cl-error" v-if="!$v.email.required && $v.email.$error">{{ $t('Field is required.') }}</span>
          <span class="validation-error block h6 cl-error" v-if="!$v.email.email && $v.email.$error">{{ $t('Please provide valid e-mail address.') }}</span>
        </div>
        <div class="mb35 relative">
          <input
            class="py10 w-100 border-box brdr-none brdr-bottom brdr-cl-primary h4 weight-200 sans-serif"
            :type="passType"
            name="password"
            v-model="password"
            :placeholder="$t('Password *')"
          >
          <i class="icon material-icons cl-brdr-secondary absolute pointer" @click="togglePassType">{{ iconName }}</i>
          <span class="validation-error block h6 cl-error" v-if="!$v.password.required && $v.password.$error">{{ $t('Field is required.') }}</span>
        </div>
        <div class="row">
          <base-checkbox
            class="col-xs-6 mb35"
            id="remember"
            v-model="remember"
            @click="remember = !remember"
          >
            {{ $t('Remember me') }}
          </base-checkbox>
          <div class="col-xs-6 mb35 align-right">
            <a href="#" @click.prevent="remindPassword">
              {{ $t('Forgot the password?') }}
            </a>
          </div>
        </div>
        <div class="mb20">
          <button-full type="submit">
            {{ $t('Log in to your account') }}
          </button-full>
        </div>
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
import { coreComponent } from 'core/lib/themes'

import ButtonFull from 'theme/components/theme/ButtonFull.vue'
import BaseCheckbox from 'theme/components/theme/blocks/Form/BaseCheckbox.vue'
import { required, email } from 'vuelidate/lib/validators'
import i18n from 'core/lib/i18n'

export default {
  data () {
    return {
      passType: 'password',
      iconName: 'visibility',
      remember: false,
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
  mixins: [coreComponent('blocks/Auth/Login')],
  methods: {
    switchElem () {
      this.$store.commit('ui/setAuthElem', 'register')
    },
    close () {
      this.$bus.$emit('modal-hide', 'modal-signup')
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
        this.$v.$touch()
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
          this.close()
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
    ButtonFull,
    BaseCheckbox
  }
}
</script>

<style lang="scss" scoped>
  @import '~theme/css/variables/colors';
  @import '~theme/css/helpers/functions/color';
  $color-placeholder: color(tertiary);
  $color-icon: color(tertiary, $colors-background);
  $color-focus: color(black);

  input::-webkit-input-placeholder {
    color: $color-placeholder;
  }

  input:-moz-placeholder {
    color: $color-placeholder;
  }

  input:focus {
    outline: none;
    border-color: $color-focus;
    transition: 0.3s all;
  }

  .icon {
    right: 0;
    top: 10px;

    &:hover {
      color: $color-icon;
    }
  }
</style>
