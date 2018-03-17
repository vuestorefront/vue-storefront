<template>
  <div>
    <header class="modal-header py25 px65 h1 serif weight-700 bg-cl-secondary">
      <i slot="close" class="modal-close material-icons p15 cl-bg-tertiary" @click="close">close</i>
      {{ $t('Register') }}
    </header>

    <div class="modal-content pt30 pb60 px65 cl-secondary">
      <form @submit.prevent="register" novalidate>
        <div class="mb35">
          <input
            class="w-100 py10 border-box brdr-none brdr-bottom brdr-cl-primary h4 weight-200 sans-serif"
            type="email"
            name="email"
            ref="email"
            v-model="email"
            autocomplete="email"
            :placeholder="$t('E-mail address *')"
          >
          <span class="validation-error block h6 cl-error" v-if="!$v.email.required && $v.email.$error">Field is required.</span>
          <span class="validation-error block h6 cl-error" v-if="!$v.email.email && $v.email.$error">Please provide valid e-mail address.</span>
        </div>
        <div class="row mb35">
          <div class="col-xs-6">
            <input
              class="w-100 py10 border-box brdr-none brdr-bottom brdr-cl-primary h4 weight-200 sans-serif"
              type="text"
              name="fist-name"
              v-model="firstName"
              autocomplete="given-name"
              :placeholder="$t('First name *')"
            >
            <span class="validation-error block h6 cl-error" v-if="!$v.firstName.required && $v.firstName.$error">Field is required.</span>
          </div>
          <div class="col-xs-6">
            <input
              class="w-100 py10 border-box brdr-none brdr-bottom brdr-cl-primary h4 weight-200 sans-serif"
              type="text"
              name="last-name"
              v-model="lastName"
              autocomplete="family-name"
              :placeholder="$t('Last name *')"
            >
            <span class="validation-error block h6 cl-error" v-if="!$v.lastName.required && $v.lastName.$error">Field is required.</span>
          </div>
        </div>
        <div class="mb35 relative">
          <input
            class="w-100 py10 pr30 border-box brdr-none brdr-bottom brdr-cl-primary h4 weight-200 sans-serif"
            name="password"
            v-model="password"
            :type="passType.pass"
            autocomplete="new-password"
            :placeholder="$t('Password *')"
          >
          <i class="icon material-icons absolute cl-brdr-secondary pointer" @click="togglePassType('pass')">{{ iconName.pass }}</i>
          <span class="validation-error block h6 cl-error" v-if="!$v.password.required && $v.password.$error">Field is required.</span>
        </div>
        <div class="mb35 relative">
          <input
            class="w-100 py10 pr30 border-box brdr-none brdr-bottom brdr-cl-primary h4 weight-200 sans-serif"
            name="password-confirm"
            v-model="rPassword"
            :type="passType.repeatPass"
            autocomplete="new-password"
            :placeholder="$t('Repeat password *')"
          >
          <i class="icon material-icons absolute cl-brdr-secondary pointer" @click="togglePassType('repeatPass')">{{ iconName.repeatPass }}</i>
          <span class="validation-error block h6 cl-error" v-if="!$v.rPassword.sameAsPassword">Passwords must be identical.</span>
        </div>
        <base-checkbox
          class="mb35"
          id="terms"
          v-model="conditions"
          @click="conditions = !conditions"
          @blur="$v.conditions.$reset()"
          @change="$v.conditions.$touch()"
          :validation-if="!$v.conditions.required && $v.conditions.$error"
          :validation-text="$t('You must accept the terms and conditions.')"
        >
          {{ $t('I accept terms and conditions') }} *
        </base-checkbox>
        <div class="mb20">
          <button-full type="submit">
            {{ $t('Register an account') }}
          </button-full>
        </div>
        <div class="center-xs">
          <span>
            {{ $t('or') }}
            <a href="#" @click.prevent="switchElem">
              {{ $t('login to your account') }}
            </a>
          </span>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import ButtonFull from 'theme/components/theme/ButtonFull.vue'
import BaseCheckbox from '../Form/BaseCheckbox.vue'
import { required, email, sameAs } from 'vuelidate/lib/validators'
import i18n from 'core/lib/i18n'

export default {
  data () {
    return {
      passType: {
        pass: 'password',
        repeatPass: 'password'
      },
      iconName: {
        pass: 'visibility',
        repeatPass: 'visibility'
      },
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      rPassword: '',
      conditions: ''

    }
  },
  validations: {
    email: {
      required,
      email
    },
    firstName: {
      required
    },
    lastName: {
      required
    },
    password: {
      required
    },
    rPassword: {
      required,
      sameAsPassword: sameAs('password')
    },
    conditions: {
      required
    }
  },
  methods: {
    close () {
      this.$bus.$emit('modal-hide', 'modal-signup')
    },
    switchElem () {
      this.$store.commit('ui/setAuthElem', 'login')
    },
    togglePassType (name) {
      if (this.passType[name] === 'password') {
        this.passType[name] = 'text'
        this.iconName[name] = 'visibility_off'
      } else {
        this.passType[name] = 'password'
        this.iconName[name] = 'visibility'
      }
    },
    register () {
      if (this.$v.$invalid) {
        this.$v.$touch()
        this.$bus.$emit('notification', {
          type: 'error',
          message: i18n.t('Please fix the validation errors'),
          action1: { label: 'OK', action: 'close' }
        })
        return
      }

      this.$bus.$emit('notification-progress-start', i18n.t('Registering the account ...'))
      this.$store.dispatch('user/register', { email: this.email, password: this.password, firstname: this.firstName, lastname: this.lastName }).then((result) => {
        console.log(result)
        this.$bus.$emit('notification-progress-stop')
        if (result.code !== 200) {
          this.$bus.$emit('notification', {
            type: 'error',
            message: result.result,
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
        this.$bus.$emit('notification-progress-stop')
        console.error(err)
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
$color-hover: color(tertiary, $colors-background);
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
    color: $color-hover;
  }
}
</style>
