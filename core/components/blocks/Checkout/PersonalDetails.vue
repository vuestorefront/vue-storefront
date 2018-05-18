<template>
  <div class="personal-details">
    Core personal details
  </div>
</template>

<script>
import { mapState } from 'vuex'
import i18n from 'core/lib/i18n'

export default {
  name: 'PersonalDetails',
  props: {
    isActive: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      isFilled: false,
      personalDetails: this.$store.state.checkout.personalDetails,
      createAccount: false,
      acceptConditions: false,
      password: '',
      rPassword: ''
    }
  },
  computed: {
    ...mapState({
      currentUser: state => state.user.current
    })
  },
  methods: {
    onLoggedIn (receivedData) {
      this.personalDetails = {
        firstName: receivedData.firstname,
        lastName: receivedData.lastname,
        emailAddress: receivedData.email
      }
    },
    sendDataToCheckout () {
      if (this.createAccount) {
        if (this.$v.$invalid) {
          this.$v.$touch()
          this.validationError()
          return
        }
        this.personalDetails.password = this.password
        this.personalDetails.createAccount = true
      } else {
        if (this.$v.personalDetails.$invalid) {
          this.$v.personalDetails.$touch()
          this.validationError()
          return
        }
        this.personalDetails.createAccount = false
      }
      this.$bus.$emit('checkout-after-personalDetails', this.personalDetails, this.$v)
      this.isFilled = true
    },
    edit () {
      if (this.isFilled) {
        this.$bus.$emit('checkout-before-edit', 'personalDetails')
        this.isFilled = false
      }
    },
    gotoAccount () {
      this.$bus.$emit('modal-show', 'modal-signup')
    },
    validationError () {
      this.$bus.$emit('notification', {
        type: 'error',
        message: i18n.t('Please fix the validation errors'),
        action1: { label: 'OK', action: 'close' }
      })
    }
  },
  created () {
    this.$bus.$on('user-after-loggedin', this.onLoggedIn)
  },
  destroyed () {
    this.$bus.$off('user-after-loggedin', this.onLoggedIn)
  }
}
</script>
