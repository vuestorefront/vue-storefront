import i18n from '@vue-storefront/core/lib/i18n'

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
    switchElem () {
      this.$store.commit('ui/setAuthElem', 'register')
    },
    remindPassword () {
      if (!(typeof navigator !== 'undefined' && navigator.onLine)) {
        this.$bus.$emit('notification', {
          type: 'error',
          message: i18n.t('Reset password feature does not work while offline!'),
          action1: { label: i18n.t('OK'), action: 'close' }
        })
      } else {
        this.$store.commit('ui/setAuthElem', 'forgot-pass')
      }
    }
  }
}
