<template>
  <div class="overlay" @click="onClick" v-if="isVisible">
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'overlay',
  computed: mapState({
    isVisible: state => state.ui.overlay
  }),
  methods: {
    onClick () {
      this.$store.commit('setOverlay', false)
      this.$store.commit('setSidebar', false)
      this.$store.commit('setMicrocart', false)
    }
  }
}
</script>

<style scoped>
.overlay {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: rgba(0,0,0,.4);
    z-index: 1;
}
</style>
