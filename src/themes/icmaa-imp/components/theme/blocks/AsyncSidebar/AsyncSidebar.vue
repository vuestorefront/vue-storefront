<template>
  <transition :name="direction === 'right' ? 'slide-left' : direction === 'left' ? 'slide-right' : null ">
    <div
      class="t-max-w-full t-fixed t-bg-white"
      :class="direction === 'left' ? 'left-sidebar' : direction === 'right' ? 'right-sidebar' : null "
      data-testid="sidebar"
      ref="sidebar"
      v-if="isOpen"
    >
      <component :is="component" @close="$emit('close')" @reload="getComponent" />
    </div>
  </transition>
</template>

<script>
import LoadingSpinner from 'theme/components/theme/blocks/AsyncSidebar/LoadingSpinner.vue'
import LoadingError from 'theme/components/theme/blocks/AsyncSidebar/LoadingError.vue'
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock'

export default {
  props: {
    asyncComponent: {
      type: Function,
      required: true
    },
    isOpen: {
      type: Boolean,
      default: false
    },
    /** "right" or "left"  */
    direction: {
      type: String,
      default: 'right'
    }
  },
  watch: {
    isOpen (state) {
      if (state) {
        this.$nextTick(() => {
          disableBodyScroll(this.$refs.sidebar)
        })
      } else {
        clearAllBodyScrollLocks()
      }
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
      this.component = () => ({
        component: this.asyncComponent(),
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
  @import '~theme/css/base/global_vars';
  $z-index-modal: map-get($z-index, modal);

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
    z-index: $z-index-modal;
    height: 100%;
    width: 800px;
    min-width: 320px;
    overflow-y: auto;
    overflow-x: hidden;
  }

  .left-sidebar{
    height: 100vh;
    width: 350px;
    top: 0;
    left: 0;
    overflow: hidden;
    overflow-y: auto;
    z-index: $z-index-modal;

    @media (max-width: 767px) {
      width: 100vh;
    }
  }
</style>
