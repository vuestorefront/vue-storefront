<template>
  <div>
    <div class="py35 px55 bg-lightgray">
      <h1 class="my0">Log in</h1>
    </div>
    <div class="py35 px55 bg-white c-gray">
      <form>
        <div class="mb35">
          <input type="email" name="email" v-model="email" placeholder="E-mail address *">
          <span class="validation-error" v-if="!$v.email.required">Field is required.</span>
          <span class="validation-error" v-if="!$v.email.email">Please provide valid e-mail address.</span>
        </div>
        <div class="mb35 pass-container">
          <input :type="passType" name="password" v-model="password" placeholder="Password *">
          <i class="icon material-icons c-alto" @click="togglePassType">{{ iconName }}</i>
          <span class="validation-error" v-if="!$v.password.required">Field is required.</span>
        </div>
        <div class="row">
          <div class="col-xs-7 mb35">
            <input class="m5" type="checkbox" name="remember" id="remember">
            <label for="remember">Remember me</label>
          </div>
          <div class="col-xs-5 mb35 align-right">
            <a href="#" @click.prevent="remindPassword">Forgot the password?</a>
          </div>
        </div>
        <div class="mb35">
          <button-full class="btn-full p0" text="Log in to your account" @click.native="login"></button-full>
        </div>
        <div class="center-xs">
          <span>or <a href="#" @click.prevent="switchElem">register an account</a></span>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { coreComponent } from 'lib/themes'
import EventBus from 'src/event-bus/event-bus'

import ButtonFull from 'theme/components/theme/ButtonFull.vue'
import { required, email } from 'vuelidate/lib/validators'

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
      this.$store.commit('ui/setAuthElem', 'forgot-pass')
    },
    login () {
      if (this.$v.$invalid) {
        EventBus.$emit('notification', {
          type: 'error',
          message: 'Please fix the validation errors',
          action1: { label: 'OK', action: 'close' }
        })
        return
      }
      this.$store.dispatch('user/login', { username: this.email, password: this.password }).then((result) => {
        console.log(result)
        if (result.code !== 200) {
          EventBus.$emit('notification', {
            type: 'error',
            message: result.result,
            action1: { label: 'OK', action: 'close' }
          })
        } else {
          EventBus.$emit('notification', {
            type: 'success',
            message: 'You are logged in!',
            action1: { label: 'OK', action: 'close' }
          })
          this.$store.commit('ui/setSignUp', false)
        }
      }).catch(err => {
        console.error(err)
      })
    }
  },
  components: {
    ButtonFull
  }
}
</script>

<style lang="scss" scoped>
  @import '../../../../css/text.scss';

  input[type=password], input[type=email], input[type=text] {
    @extend body;
    box-sizing: border-box;
    font-size: 18px;
    padding-top: 10px;
    padding-bottom: 10px;
    border: none;
    border-bottom: 1px solid #BDBDBD;
    width: 100%;
  }

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

  .btn-full {
    box-sizing: border-box;
    width: 100%;
    justify-content: center;
    text-align: center;
  }

  .pass-container {
    position: relative;
  }

  .icon {
    cursor: pointer;
    position: absolute;
    right: 0;
    top: 10px;

    &:hover {
      color: #8E8E8E;
    }
  }

  .validation-error {
    display: block;
    font-size: 12px;
    color: #EB5757;
  }
</style>
