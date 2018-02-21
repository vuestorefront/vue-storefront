<template>
  <div class="account-icon">
    Core Account
    <button @click="gotoAccount">Account</button>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'AccountIcon',
  computed: {
    ...mapState({
      isOpenLogin: state => state.ui.signUp,
      currentUser: state => state.user.current
    })
  },
  methods: {
    gotoAccount () {
      if (!this.$store.state.user.current) {
        this.$store.commit('ui/setSignUp', !this.isOpenLogin)
      }
    },
    logout () {
      this.$bus.$emit('user-before-logout')
    }
  }
}
</script>
