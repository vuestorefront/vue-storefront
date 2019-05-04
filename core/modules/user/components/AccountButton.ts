
export const AccountButton = {
  name: 'AccountButton',
  computed: {
    isLoggedIn () {
      return this.$store.getters['user/isLoggedIn']
    },
    user () {
      return this.$store.state.user.current
    }
  },
  methods: {
    goToAccount () {
      if (this.currentUser) {
        this.$router.push(this.localizedRoute('/my-account'))
      } else {
        this.$store.commit('ui/setAuthElem', 'login')
        this.$bus.$emit('modal-show', 'modal-signup')
      }
    },
    logout () {
      this.$bus.$emit('user-before-logout')
      this.$router.push(this.localizedRoute('/'))
    }
  }
}
