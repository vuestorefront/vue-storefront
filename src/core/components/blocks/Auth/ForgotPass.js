
export default {
  name: 'ForgotPass',
  data () {
    return {
      email: '',
      passwordSent: false
    }
  },
  methods: {
    switchElem () {
      this.$store.commit('ui/setAuthElem', 'login')
    }
  }
}
