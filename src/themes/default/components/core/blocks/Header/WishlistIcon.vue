<template> 
    <i class="material-icons md-18" @click="wishlistClick">favorite_border</i>
</template>

<script>
import { coreComponent } from 'lib/themes'
import EventBus from 'src/event-bus/event-bus'

export default {
  methods: {
    wishlistClick () {
      EventBus.$emit('notification', {
        type: 'success',
        message: 'This feature is not implemented yet :( Wishlist is on our roadmap!',
        action1: { label: 'OK', action: 'close' }
      })
    }
  },
  mixins: [coreComponent('core/blocks/Header/WishlistIcon')]
}
</script>

<style scoped>

</style>
