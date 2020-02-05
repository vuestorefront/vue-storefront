import { mapState, mapGetters } from 'vuex'
import RootState from '@vue-storefront/core/types/RootState'

export const PersonalDetails = {
  name: 'PersonalDetails',
  props: {
    isActive: {
      type: Boolean,
      required: true
    },
    focusedField: {
      type: String,
      required: false
    }
  },
  data () {
    return {
      isFilled: false,
      personalDetails: this.$store.state.checkout.personalDetails,
      createAccount: false,
      acceptConditions: false,
      password: '',
      rPassword: '',
      isValidationError: false
    }
  },
  computed: {
    ...mapState({
      currentUser: (state: RootState) => state.user.current
    }),
    ...mapGetters({
      isVirtualCart: 'cart/isVirtualCart'
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
        this.personalDetails.password = this.password
        this.personalDetails.createAccount = true
      } else {
        this.personalDetails.createAccount = false
      }
      this.$bus.$emit('checkout-after-personalDetails', this.personalDetails, this.$v)
      this.isFilled = true
      this.isValidationError = false
    },
    edit () {
      if (this.isFilled) {
        this.$bus.$emit('checkout-before-edit', 'personalDetails')
      }
    },
    gotoAccount () {
      this.$bus.$emit('modal-show', 'modal-signup')
    },
    onCheckoutLoad () {
      this.personalDetails = this.$store.state.checkout.personalDetails
    }
  },
  updated () {
    // Perform focusing on a field, name of which is passed through 'focusedField' prop
    if (this.focusedField && !this.isValidationError) {
      if (this.focusedField === 'password') {
        this.isValidationError = true
        this.password = ''
        this.rPassword = ''
        this.$refs['password'].setFocus('password')
      }
    }
  },
  beforeMount () {
    this.$bus.$on('checkout-after-load', this.onCheckoutLoad)
    this.$bus.$on('user-after-loggedin', this.onLoggedIn)
  },
  beforeDestroy () {
    this.$bus.$off('checkout-after-load', this.onCheckoutLoad)
    this.$bus.$off('user-after-loggedin', this.onLoggedIn)
  }
}
