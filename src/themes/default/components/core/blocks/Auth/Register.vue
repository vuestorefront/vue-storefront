<template>
  <div>
    <div class="py35 px65 bg-lightgray">
      <h1 class="my0">Register</h1>
    </div>
    <div class="py35 px65 bg-white c-gray">
      <form @submit.prevent="register" novalidate>
        <div class="mb35">
          <input
            class="w-100 py10 border-box brdr-none brdr-bottom brdr-c-lightgray-secondary h4 weight-200 sans-serif"
            type="email"
            name="email"
            ref="email"
            v-model="email"
            autocomplete="email"
            placeholder="E-mail address *"
          >
          <span class="validation-error h6 c-red" v-if="!$v.email.required">Field is required.</span>
          <span class="validation-error h6 c-red" v-if="!$v.email.email">Please provide valid e-mail address.</span>
        </div>
        <div class="row mb35">
          <div class="col-xs-6">
            <input
              class="w-100 py10 border-box brdr-none brdr-bottom brdr-c-lightgray-secondary h4 weight-200 sans-serif"
              type="text"
              name="fist-name"
              v-model="firstName"
              autocomplete="given-name"
              placeholder="First name *"
            >
            <span class="validation-error h6 c-red" v-if="!$v.firstName.required">Field is required.</span>
          </div>
          <div class="col-xs-6">
            <input
              class="w-100 py10 border-box brdr-none brdr-bottom brdr-c-lightgray-secondary h4 weight-200 sans-serif"
              type="text"
              name="last-name"
              v-model="lastName"
              autocomplete="family-name"
              placeholder="Last name *"
            >
            <span class="validation-error h6 c-red" v-if="!$v.lastName.required">Field is required.</span>
          </div>
        </div>
        <div class="mb35 relative">
          <input
            class="w-100 py10 pr30 border-box brdr-none brdr-bottom brdr-c-lightgray-secondary h4 weight-200 sans-serif"
            name="password"
            v-model="password"
            :type="passType.pass"
            autocomplete="new-password"
            placeholder="Password *"
          >
          <i class="icon material-icons absolute c-alto pointer" @click="togglePassType('pass')">{{ iconName.pass }}</i>
          <span class="validation-error h6 c-red" v-if="!$v.password.required">Field is required.</span>
        </div>
        <div class="mb35 relative">
          <input
            class="w-100 py10 pr30 border-box brdr-none brdr-bottom brdr-c-lightgray-secondary h4 weight-200 sans-serif"
            name="password-confirm"
            v-model="rPassword"
            :type="passType.repeatPass"
            autocomplete="new-password"
            placeholder="Repeat password *"
          >
          <i class="icon material-icons absolute c-alto pointer" @click="togglePassType('repeatPass')">{{ iconName.repeatPass }}</i>
          <span class="validation-error h6 c-red" v-if="!$v.rPassword.sameAsPassword">Passwords must be identical.</span>
        </div>
        <div class="mb35">
          <input type="checkbox" name="remember" v-model="conditions" id="remember">
          <label class="ml10" for="remember">I accept terms and conditions *</label>
          <span class="validation-error h6 c-red" v-if="!$v.conditions.required">You must accept the terms and conditions.</span>
        </div>
        <div class="mb20">
          <button-full class="w-100 border-box center-xs" text="Register an account" @click.native="register"/>
        </div>
        <input class="hidden" type="submit">
        <div class="center-xs">
          <span>or <a href="#" @click.prevent="switchElem">login to your account</a></span>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import ButtonFull from 'theme/components/theme/ButtonFull.vue'
import { required, email, sameAs } from 'vuelidate/lib/validators'
import i18n from 'lib/i18n'

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
          this.$store.commit('ui/setSignUp', false)
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
    ButtonFull
  }
}
</script>
<style lang="scss" scoped>
  input::-webkit-input-placeholder {
    color: #BDBDBD;
  }

  input:-moz-placeholder {
    color: #BDBDBD;
  }

  input:focus {
    outline: none;
    border-color: black;
    transition: 0.3s all;
  }

  .validation-error {
    display: block;
  }

  .icon {
    right: 0;
    top: 10px;

    &:hover {
      color: #8E8E8E;
    }
  }

</style>
