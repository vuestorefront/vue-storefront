<template>
  <div class="account-icon">
    Core Account
    <button @click="toggleLogin">Login</button>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'account-icon',
  computed: {
    ...mapState({
      isOpenLogin: state => state.ui.signUp
    })
  },
  methods: {
    toggleLogin () {
      this.$store.commit('ui/setSignUp', !this.isOpenLogin)
    }
  }
}
</script>
