<template>
  <button-icon icon="person" :title="title" @click="toggleAccount" />
</template>

<script>
import { mapGetters } from 'vuex'
import ButtonIcon from 'theme/components/core/blocks/Header/ButtonIcon'

export default {
  name: 'ButtonAccount',
  components: {
    ButtonIcon
  },
  computed: {
    ...mapGetters('user', ['isLoggedIn']),
    title () {
      return this.isLoggedIn ? 'My Account' : 'Login'
    }
  },
  methods: {
    toggleAccount () {
      if (!this.isLoggedIn) {
        this.$bus.$emit('modal-toggle', 'modal-signup')
      } else {
        this.$store.dispatch('ui/setUserSidebar', true)
      }
    }
  }
}
</script>
