<template>
  <div class="overlay" @click="onClick">
  </div>
</template>

<script>
export default {
  name: 'overlay',
  methods: {
    onClick () {
      this.$store.commit('ui/setOverlay', false)
    }
  }
}
</script>

<style scoped>
.overlay {
    width: 100%;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0,0,0,.4);
    z-index: 3;
}
</style>
