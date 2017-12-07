<template>
  <div>
    <div class="py35 px55 bg-lightgray">
      <h1 class="my0">Forgot your password?</h1>
    </div>
    <div class="py35 px55 bg-white c-gray">
      <form>
        <div class="mb35">
          <p>Enter your email adress below and we'll send you password reset instructions.</p>
          <input class="brdr-none py10 h4 weight-200" type="email" name="email" v-model="email" placeholder="E-mail address *">
          <p class="m0 c-red h6" v-if="!$v.email.required">Field is required.</p>
          <p class="m0 c-red h6" v-if="!$v.email.email">Please provide valid e-mail address.</p>
        </div>
        <div class="mb35">
          <button-full class="btn-full p0 center-xs" text="Reset password" @click.native="sendEmail"></button-full>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { coreComponent } from 'lib/themes'

import ButtonFull from 'theme/components/theme/ButtonFull.vue'
import { required, email } from 'vuelidate/lib/validators'

export default {
  data () {
    return {
      email: ''
    }
  },
  validations: {
    email: {
      required,
      email
    }
  },
  methods: {
    sendEmail () {
      // todo: send email with reset password instructions

      if (this.$v.$invalid) {
        this.$bus.$emit('notification', {
          type: 'error',
          message: 'Please fix the validation errors',
          action1: { label: 'OK', action: 'close' }
        })
        return
      }

      this.$store.dispatch('user/resetPassword', { email: this.email }).then((response) => {
        if (response.code === 200) {
          this.$bus.$emit('notification', {
            type: 'success',
            message: `An email has been sent to '${this.email}' with further informations on how to reset your password.`,
            action1: { label: 'OK', action: 'close' }
          })
        } else {
          this.$bus.$emit('notification', {
            type: 'error',
            message: response.result || 'Error while sending reset password e-mail',
            action1: { label: 'OK', action: 'close' }
          })
        }
      })
      this.$store.commit('ui/setSignUp', false)
    }
  },
  mixins: [coreComponent('core/blocks/Auth/ForgotPass')],
  components: {
    ButtonFull
  }
}
</script>

<style lang="scss" scoped>
  input[type=email] {
    box-sizing: border-box;
    border-bottom: 1px solid #BDBDBD;
    width: 100%;
    font-family: 'Roboto', sans-serif;
  }

  input::-webkit-input-placeholder {
    color: #BDBDBD;
  }

  input:-moz-placeholder {
    color: #BDBDBD;
  }

  input:focus {
    outline: none;
    border-color: #000000;
    transition: 0.3s all;
  }

  .btn-full {
    display: block;
  }
</style>
