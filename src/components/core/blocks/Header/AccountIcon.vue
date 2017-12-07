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
      } else {
        this.$emit('notification', {
          type: 'success',
          message: 'You are logged in as ' + this.$store.state.user.current.email + ' and the User Account feature is work in progress!',
          action1: { label: 'OK', action: 'close' }
        })
      }
    }
  }
}
</script>
