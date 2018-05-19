<template>
  <div>
    <header class="modal-header py25 px65 h1 serif weight-700 bg-cl-secondary">
      <i
        slot="close"
        class="modal-close material-icons p15 cl-bg-tertiary"
        @click="close"
      >
        close
      </i>
      {{ $t('Register') }}
    </header>

    <div class="modal-content pt30 pb60 px65 cl-secondary">
      <form @submit.prevent="register" novalidate>
        <base-input
          class="mb35"
          type="email"
          name="email"
          autocomplete="email"
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
        <div class="row mb35">
          <base-input
            class="col-xs-6"
            type="text"
            name="fist-name"
            autocomplete="given-name"
            v-model="firstName"
            :placeholder="$t('First name *')"
            :validation="{
              condition: !$v.firstName.required && $v.firstName.$error,
              text: $t('Field is required.')
            }"
          />
          <base-input
            class="col-xs-6"
            type="text"
            name="last-name"
            autocomplete="last-name"
            v-model="lastName"
            :placeholder="$t('Last name *')"
            :validation="{
              condition: !$v.lastName.required && $v.lastName.$error,
              text: $t('Field is required.')
            }"
          />
        </div>
        <base-input
          class="mb35"
          type="password"
          name="password"
          autocomplete="new-password"
          v-model="password"
          :placeholder="$t('Password *')"
          :validation="{
            condition: !$v.password.required && $v.password.$error,
            text: $t('Field is required.')
          }"
        />
        <base-input
          class="mb35"
          type="password"
          name="password-confirm"
          autocomplete="new-password"
          v-model="rPassword"
          :placeholder="$t('Repeat password *')"
          :validations="[
            {
              condition: !$v.rPassword.required && $v.rPassword.$error,
              text: $t('Field is required.')
            },
            {
              condition: !$v.rPassword.sameAsPassword,
              text: $t('Passwords must be identical.')
            }
          ]"
        />
        <base-checkbox
          class="mb35"
          id="terms"
          v-model="conditions"
          @click="conditions = !conditions"
          @blur="$v.conditions.$reset()"
          @change="$v.conditions.$touch()"
          :validation="{
            condition: !$v.conditions.required && $v.conditions.$error,
            text: $t('You must accept the terms and conditions.')
          }"
        >
          {{ $t('I accept terms and conditions') }} *
        </base-checkbox>
        <button-full class="mb20" type="submit">
          {{ $t('Register an account') }}
        </button-full>
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
import Register from 'core/components/blocks/Auth/register'
import ButtonFull from 'theme/components/theme/ButtonFull.vue'
import BaseCheckbox from '../Form/BaseCheckbox.vue'
import BaseInput from '../Form/BaseInput.vue'
import { required, email, sameAs } from 'vuelidate/lib/validators'
import i18n from 'core/lib/i18n'

export default {
  data () {
    return {
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      rPassword: '',
      conditions: false
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
  mixins: [Register],
  methods: {
    close () {
      this.$bus.$emit('modal-hide', 'modal-signup')
    },
    switchElem () {
      this.$store.commit('ui/setAuthElem', 'login')
    },
    register () {
      if (this.$v.$invalid) {
        this.$v.$touch()
        this.$bus.$emit('notification', {
          type: 'error',
          message: i18n.t('Please fix the validation errors'),
          action1: { label: i18n.t('OK'), action: 'close' }
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
            action1: { label: i18n.t('OK'), action: 'close' }
          })
        } else {
          this.$bus.$emit('notification', {
            type: 'success',
            message: i18n.t('You are logged in!'),
            action1: { label: i18n.t('OK'), action: 'close' }
          })
          this.close()
        }
      }).catch(err => {
        this.$bus.$emit('notification-progress-stop')
        console.error(err)
      })
    }
  },
  components: {
    ButtonFull,
    BaseCheckbox,
    BaseInput
  }
}
</script>
