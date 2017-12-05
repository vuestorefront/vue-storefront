<template>
  <div>
    Core SignUp
    <login />
    <register />
    <forgot-pass />
  </div>
</template>
<script>
import Login from './Login.vue'
import Register from './Register.vue'
import ForgotPass from './ForgotPass.vue'

import { mapState } from 'vuex'

export default {
  name: 'sign-up',
  components: {
    Login,
    Register,
    ForgotPass
  },
  computed: {
    ...mapState({
      isOpen: state => state.ui.signUp
    })
  },
  methods: {
    closeSignUp () {
      this.$store.commit('ui/setSignUp', false)
    }
  }
}
</script>
