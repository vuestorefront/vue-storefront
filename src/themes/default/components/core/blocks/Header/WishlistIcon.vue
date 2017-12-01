<template>
  <div>
    <i class="material-icons md-18 panel" @click="toggleWishlistPanel">favorite_border</i>
    <i class="material-icons md-18" @click="toggleLogin">favorite</i>
  </div>
</template>

<script>
import { coreComponent } from 'lib/themes'
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      isOpenLogin: state => state.ui.signUp
    })
  },
  methods: {
    toggleLogin () {
      this.$store.commit('ui/setSignUp', !this.isOpenLogin)
    }
  },
  mixins: [coreComponent('core/blocks/Header/WishlistIcon')]
}
</script>

<style lang="scss" scoped>
</style>
