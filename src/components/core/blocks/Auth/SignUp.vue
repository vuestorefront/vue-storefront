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

export default {
  name: 'sign-up',
  components: {
    Login,
    Register,
    ForgotPass
  },
  methods: {
    closeSignUp () {
      this.$store.commit('ui/setSignUp', false)
    }
  }
}
</script>
