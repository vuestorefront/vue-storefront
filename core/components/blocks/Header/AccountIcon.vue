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
      currentUser: state => state.user.current
    })
  },
  methods: {
    gotoAccount () {
      if (!this.currentUser) {
        this.$bus.$emit('modal.show', 'modal-signup')
      }
    },
    logout () {
      this.$bus.$emit('user-before-logout')
    }
  }
}
</script>
