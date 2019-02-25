<template>
  <transition name="slide-left">
    <div
      class="right-sidebar mw-100 fixed cl-accent bg-cl-primary"
      data-testid="sidebar"
      v-if="isOpen"
    >
      <component :is="component"/>
    </div>
  </transition>
</template>

<script>
import LoadingSpinner from 'theme/components/theme/blocks/AsyncSidebar/LoadingSpinner.vue'
import LoadingError from 'theme/components/theme/blocks/AsyncSidebar/LoadingError.vue'
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
    },
    close: {
      type: Function,
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
      const asyncComponent = this.asyncComponent.bind({})
      this.component = () => ({
        component: asyncComponent(),
        loading: LoadingSpinner,
        error: LoadingError,
        timeout: 3000
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~theme/css/animations/transitions";

  .slide-left-enter-active,
  .slide-left-leave-active,
  .slide-right-enter-active,
  .slide-right-leave-active {
    transition: transform .25s;
  }

  .slide-left-enter,
  .slide-left-leave-to {
    transform: translateX(100%);
  }

  .slide-right-enter,
  .slide-right-leave-to {
    transform: translateX(-100%);
  }

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
