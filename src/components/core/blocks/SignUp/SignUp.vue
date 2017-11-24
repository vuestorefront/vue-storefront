<template>
  <div>
    Core SignUp
    <login />
    <register />
  </div>
</template>
<script>
import Login from './Login.vue'
import Register from './Register.vue'

import { mapState } from 'vuex'

export default {
  name: 'sign-up',
  components: {
    Login,
    Register,
    mapState
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
