<template>
  <div id="overlay" v-if="isVisible">
  </div>
</template>

<script>
import EventBus from 'src/event-bus/event-bus'

export default {
  name: 'overlay',
  data () {
    return {
      isVisible: false
    }
  },
  created () {
    const self = this
    EventBus.$on('toggle-overlay', () => {
      self.isVisible = !self.isVisible
    })
  }
}
</script>

<style scoped>
#overlay {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: rgba(0,0,0,.4);
}
</style>