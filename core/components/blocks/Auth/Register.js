import i18n from '@vue-storefront/i18n'

export default {
  name: 'Register',
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
  methods: {
    switchElem () {
      this.$store.commit('ui/setAuthElem', 'login')
    },
    close () {
      this.$bus.$emit('modal-hide', 'modal-signup')
    },
    callRegister () {
      this.$bus.$emit('notification-progress-start', i18n.t('Registering the account ...'))
      this.$store.dispatch('user/register', { email: this.email, password: this.password, firstname: this.firstName, lastname: this.lastName }).then((result) => {
        console.debug(result)
        this.$bus.$emit('notification-progress-stop')
        if (result.code !== 200) {
          this.onFailure(result)
          // If error includes a word 'password', focus on a corresponding field
          if (result.result.includes('password')) {
            this.$refs['password'].setFocus('password')
            this.password = ''
            this.rPassword = ''
          }
        } else {
          this.onSuccess()
          this.close()
        }
      }).catch(err => {
        this.$bus.$emit('notification-progress-stop')
        console.error(err)
      })
    }
  }
}
