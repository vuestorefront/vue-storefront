<template>
  <div class="account-icon">
    Core Account
    <button @click="gotoAccount">Account</button>
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
    gotoAccount () {
      if (!this.$store.state.user.current) {
        this.$store.commit('ui/setSignUp', !this.isOpenLogin)
      }
    }
  }
}
</script>
