import { mapState } from 'vuex'

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
    }
  }
}
