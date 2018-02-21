<template>
  <div>
    Core SignUp
    <login />
    <register />
    <forgot-pass />
  </div>
</template>
<script>
import { mapState } from 'vuex'

import Login from './Login.vue'
import Register from './Register.vue'
import ForgotPass from './ForgotPass.vue'

export default {
  name: 'SignUp',
  components: {
    Login,
    Register,
    ForgotPass
  },
  computed: {
    ...mapState({
      activeElem: state => state.ui.authElem
    })
  }
}
</script>
