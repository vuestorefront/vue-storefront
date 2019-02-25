<template>
  <div
    class="right-sidebar mw-100 fixed cl-accent bg-cl-primary"
    data-testid="sidebar"
    v-if="isOpen"
  >
    <component :is="component" v-if="isOpen" />
  </div>
</template>

<script>
// todo: add left sidebar option
export default {
  props: {
    asyncComponent: {
      type: Function,
      required: true
    },
    isOpen: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      component: null
    }
  },
  created () {
    this.getComponent()
  },
  methods: {
    getComponent () {
      this.component = this.asyncComponent.bind({})
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~theme/css/animations/transitions";

  .right-sidebar {
    top: 0;
    right: 0;
    z-index: 3;
    height: 100%;
    width: 800px;
    min-width: 320px;
    overflow-y: auto;
    overflow-x: hidden;
  }

  .close {
    i {
      opacity: 0.6;
    }
    &:hover,
    &:focus {
      i {
        opacity: 1;
      }
    }
  }
</style>
