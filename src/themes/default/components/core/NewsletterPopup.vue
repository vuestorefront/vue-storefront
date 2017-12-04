<template>
  <div class="newsletter mb20 bg-white" v-if="isOpen">
    <i class="material-icons close p15 c-gray" @click="closeNewsletter">close</i>
    <div class="py35 px55 bg-lightgray">
      <h1 class="my0">Newsletter</h1>
    </div>
    <div class="py35 px55 bg-white c-gray">
      <form>
        <div class="mb35">
          <p class="h4">Sign up to our newsletter and receive a coupon for 10% off!</p>
          <input class="brdr-none py10 h4 weight-200" type="email" name="email" v-model="email" placeholder="E-mail address *">
          <p class="m0 c-red h6" v-if="!$v.email.required">Field is required.</p>
          <p class="m0 c-red h6" v-if="!$v.email.email">Please provide valid e-mail address.</p>
        </div>
        <div class="mb35 center-xs">
          <button-full class="btn-full p0" text="Subscribe" @click.native="sendEmail"></button-full>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import ButtonFull from 'theme/components/theme/ButtonFull.vue'
import EventBus from 'src/event-bus/event-bus'
import { coreComponent } from 'lib/themes'
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
      if (this.$v.$invalid) {
        EventBus.$emit('notification', {
          type: 'error',
          message: 'Please fix the validation errors',
          action1: { label: 'OK', action: 'close' }
        })
        return
      }

      // todo: add user email to newsletter list

      EventBus.$emit('notification', {
        type: 'success',
        message: 'You have been successfully subscribed to our newsletter!',
        action1: { label: 'OK', action: 'close' }
      })
      this.$store.commit('ui/setNewsletterPopup', false)
      this.$store.commit('userData/setNewsletter', true)
    }
  },
  components: {
    ButtonFull
  },
  mixins: [coreComponent('core/NewsletterPopup')]
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

  .newsletter {
    position: absolute;
    width: 450px;
    top: 100px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 3;

    @media (max-width: 600px) {
      top: 0;
      width: 100%;
      height: 100%;
    }
  }

  .close {
    position: absolute;
    right: 0;
    top: 0;
    cursor: pointer;
  }

  .btn-full {
    display: block;
  }

</style>
