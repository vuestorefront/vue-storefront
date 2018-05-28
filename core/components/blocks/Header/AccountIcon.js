import { mapState } from 'vuex'
import i18n from 'core/lib/i18n'

export default {
  name: 'AccountIcon',
  data () {
    return {
      navigation: []
    }
  },
  computed: {
    ...mapState({
      currentUser: state => state.user.current
    })
  },
  methods: {
    goToAccount () {
      if (this.currentUser) {
        this.$router.push('/my-account')
      } else {
        this.$bus.$emit('modal-show', 'modal-signup')
      }
    },
    logout () {
      this.$bus.$emit('user-before-logout')
      this.$router.push('/')
    },
    notify (title) {
      if (title === 'My loyalty card' || title === 'My product reviews') {
        this.$bus.$emit('notification', {
          type: 'warning',
          message: i18n.t('This feature is not implemented yet! Please take a look at https://github.com/DivanteLtd/vue-storefront/issues for our Roadmap!'),
          action1: { label: i18n.t('OK'), action: 'close' }
        })
      }
    }
  }
}
