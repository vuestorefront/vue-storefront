
export const AccountButton = {
  name: 'AccountIcon',
  data () {
    return {
      navigation: []
    }
  },
  computed: {
    currentUser () {
      return this.$store.state.user.current
    }
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
