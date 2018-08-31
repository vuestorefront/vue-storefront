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
      {{ $t('Log in') }}
    </header>
    <div class="modal-content pt30 pb60 px65 cl-secondary">
      <form @submit.prevent="login" novalidate>
        <base-input
          class="mb35"
          type="email"
          name="email"
          focus
          v-model="email"
          @blur="$v.email.$touch()"
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
        <base-input
          class="mb35"
          type="password"
          name="password"
          v-model="password"
          @blur="$v.password.$touch()"
          :placeholder="$t('Password *')"
          :validation="{
            condition: !$v.password.required && $v.password.$error,
            text: $t('Field is required.')
          }"
        />
        <div class="row">
          <base-checkbox
            class="col-xs-7 col-sm-6 mb35"
            id="remember"
            v-model="remember"
            @click="remember = !remember"
          >
            {{ $t('Remember me') }}
          </base-checkbox>
          <div class="col-xs-5 col-sm-6 mb35 flex end-xs middle-xs">
            <a href="#" @click.prevent="remindPassword">
              {{ $t('Forgot the password?') }}
            </a>
          </div>
        </div>
        <button-full class="mb20" type="submit" data-testid="loginSubmit">
          {{ $t('Log in to your account') }}
        </button-full>
        <div class="center-xs">
          {{ $t('or') }}
          <a href="#" @click.prevent="switchElem" data-testid="registerLink">
            {{ $t('register an account') }}
          </a>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Login from '@vue-storefront/core/components/blocks/Auth/Login'

import ButtonFull from 'theme/components/theme/ButtonFull.vue'
import BaseCheckbox from '../Form/BaseCheckbox.vue'
import BaseInput from '../Form/BaseInput.vue'
import { required, email } from 'vuelidate/lib/validators'
import i18n from '@vue-storefront/i18n'

export default {
  mixins: [Login],
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
    close () {
      this.$bus.$emit('modal-hide', 'modal-signup')
    },
    login () {
      if (this.$v.$invalid) {
        this.$v.$touch()
        this.$bus.$emit('notification', {
          type: 'error',
          message: i18n.t('Please fix the validation errors'),
          action1: { label: i18n.t('OK'), action: 'close' }
        })
        return
      }

      this.$bus.$emit('notification-progress-start', i18n.t('Authorization in progress ...'))
      this.$store.dispatch('user/login', { username: this.email, password: this.password }).then((result) => {
        this.$bus.$emit('notification-progress-stop', {})

        if (result.code !== 200) {
          this.$bus.$emit('notification', {
            type: 'error',
            message: i18n.t(result.result),
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
        console.error(err)
        this.$bus.$emit('notification-progress-stop')
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

<style lang="scss" scoped>
  .modal-content {
    @media (max-width: 400px) {
      padding-left: 20px;
      padding-right: 20px;
    }
  }
</style>
