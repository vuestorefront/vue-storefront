<template>
    <!-- <i class="material-icons md-18" @click="wishlistClick">favorite_border</i> -->
    <i class="material-icons md-18" @click="toggleLogin">favorite_border</i>
</template>

<script>
import { coreComponent } from 'lib/themes'
import { mapState } from 'vuex'
import EventBus from 'src/event-bus/event-bus'

export default {
  methods: {
    wishlistClick () {
      EventBus.$emit('notification', {
        type: 'success',
        message: 'This feature is not implemented yet :( Wishlist is on our roadmap!',
        action1: { label: 'OK', action: 'close' }
      })
    },
    toggleLogin () {
      this.$store.commit('ui/setSignUp', !this.isOpen)
    }
  },
  computed: {
    ...mapState({
      isOpen: state => state.ui.signUp
    })
  },
  mixins: [coreComponent('core/blocks/Header/WishlistIcon')]
}
</script>

<style scoped>

</style>
