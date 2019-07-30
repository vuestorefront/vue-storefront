<template>
  <div class="top t-px-2 t-bg-white t-border-b t-border-base-lighter t-flex">
    <slot />
    <div class="t-flex-expand" />
    <top-button icon="close" text="Close" tabindex="1" @click.native="closeMenu" class="t-text-base" />
  </div>
</template>

<script>
import TopButton from 'theme/components/theme/blocks/AsyncSidebar/TopButton'

export default {
  name: 'AsyncMenuTop',
  components: {
    TopButton
  },
  methods: {
    closeMenu () {
      this.$store.commit('ui/setSidebar', false)
      this.$store.commit('ui/setMicrocart', false)
    }
  }
}
</script>

<style lang="scss" scoped>

.top {
  height: 60px;
}

</style>
