<template>
  <div>
    <div class="py35 px55 bg-lightgray">
      <h1 class="my0">Forgot your password?</h1>
    </div>
    <div class="py35 px55 bg-white c-gray">
      <form>
        <div class="mb35">
          <p>Enter your email adress below and we'll send you password reset instructions.</p>
          <input type="email" name="email" v-model="email" placeholder="E-mail address *">
          <span class="validation-error" v-if="!$v.email.required">Field is required.</span>
          <span class="validation-error" v-if="!$v.email.email">Please provide valid e-mail address.</span>
        </div>
        <div class="mb35">
          <button-full class="btn-full p0" text="Reset password" @click.native="sendEmail"></button-full>
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
      // send email with reset pass instructions
    }
  },
  mixins: [coreComponent('core/blocks/Auth/ForgotPass')],
  components: {
    ButtonFull
  }
}
</script>

<style lang="scss" scoped>
  @import '../../../../css/text.scss';

  input[type=email] {
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
