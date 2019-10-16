import i18n from '@vue-storefront/i18n'
import { Logger } from '@vue-storefront/core/lib/logger'

export const Register = {
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
      // TODO Move to theme
      this.$store.commit('ui/setAuthElem', 'login')
    },
    close () {
      // TODO Move to theme
      this.$bus.$emit('modal-hide', 'modal-signup')
    },
    callRegister () {
      // TODO Move to theme
      this.$bus.$emit('notification-progress-start', i18n.t('Registering the account ...'))
      this.$store.dispatch('user/register', { email: this.email, password: this.password, firstname: this.firstName, lastname: this.lastName }).then((result) => {
        Logger.debug(result, 'user')()
        // TODO Move to theme
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
          this.$store.dispatch('user/login', { username: this.email, password: this.password })
          this.onSuccess()
          this.close()
        }
      }).catch(err => {
        // TODO Move to theme
        this.onFailure({ result: 'Unexpected authorization error. Check your Network conection.' })
        this.$bus.$emit('notification-progress-stop')
        Logger.error(err, 'user')()
      })
    }
  }
}
