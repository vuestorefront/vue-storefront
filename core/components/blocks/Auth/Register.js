
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
    }
  }
}
