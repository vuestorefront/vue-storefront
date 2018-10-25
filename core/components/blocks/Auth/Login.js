import i18n from '@vue-storefront/i18n'

export default {
  name: 'Login',
  data () {
    return {
      remember: false,
      email: '',
      password: ''
    }
  },
  methods: {
    close () {
      this.$bus.$emit('modal-hide', 'modal-signup')
    },
    callLogin () {
      this.$bus.$emit('notification-progress-start', i18n.t('Authorization in progress ...'))
      this.$store.dispatch('user/login', { username: this.email, password: this.password }).then((result) => {
        this.$bus.$emit('notification-progress-stop', {})

        if (result.code !== 200) {
          this.notifyFailure(result)
        } else {
          this.notifySuccess()
          this.close()
        }
      }).catch(err => {
        console.error(err)
        this.$bus.$emit('notification-progress-stop')
      })
    },
    switchElem () {
      this.$store.commit('ui/setAuthElem', 'register')
    },
    callForgotPassword () {
      this.$store.commit('ui/setAuthElem', 'forgot-pass')
    }
  }
}
