<template>
  <div class="personal-details">
    Core personal details
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'PersonalDetails',
  props: ['isActive'],
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
    sendDataToCheckout () {
      if (this.createAccount) {
        this.personalDetails.password = this.password
        this.personalDetails.createAccount = true
      } else {
        this.personalDetails.createAccount = false
      }
      this.$bus.$emit('checkout.personalDetails', this.personalDetails, this.$v)
      this.isFilled = true
    },
    edit () {
      if (this.isFilled) {
        this.$bus.$emit('checkout.edit', 'personalDetails')
        this.isFilled = false
      }
    },
    gotoAccount () {
      this.$store.commit('ui/setSignUp', true)
    }
  },
  created () {
    this.$bus.$on('user-after-loggedin', (receivedData) => {
      this.personalDetails = {
        firstName: receivedData.firstname,
        lastName: receivedData.lastname,
        emailAddress: receivedData.email
      }
    })
  },
  destroyed () {
    this.$bus.$off('user-after-loggedin')
  }
}
</script>
