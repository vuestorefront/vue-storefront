<template>
  <transition :name="direction === 'right' ? 'slide-left' : direction === 'left' ? 'slide-right' : null">
    <div
      class="sidebar t-max-w-full t-fixed t-scrolling-touch t-bg-white"
      :class="[direction === 'left' ? 'left-sidebar' : direction === 'right' ? 'right-sidebar' : null, { 'wide': wide }]"
      data-test-id="Sidebar"
      ref="sidebar"
      v-if="isOpen"
    >
      <div class="submenu-wrapper" :style="{ ...translateX }">
        <component :is="component" @close="$emit('close')" @reload="getComponent" />
        <submenu v-for="(item, i) in sidebarPath" :key="i" :index="i" :async-component="item.component" />
      </div>
    </div>
  </transition>
</template>

<script>
import { mapGetters } from 'vuex'

import Submenu from 'theme/components/core/blocks/AsyncSidebar/Submenu'
import LoadingSpinner from 'theme/components/core/blocks/AsyncSidebar/LoadingSpinner'
import LoadingError from 'theme/components/core/blocks/AsyncSidebar/LoadingError'
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock'

export default {
  name: 'Sidebar',
  components: {
    Submenu
  },
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
    },
    wide: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    isOpen (state) {
      this.$nextTick(() => {
        if (state) {
          disableBodyScroll(this.$refs.sidebar)
        } else {
          clearAllBodyScrollLocks()
        }
      })
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
  mounted () {
    // Close this if browser-back button is called
    window.addEventListener('popstate', this.onHistoryBack)
  },
  destroyed () {
    window.removeEventListener('popstate', this.onHistoryBack)
  },
  methods: {
    getComponent () {
      this.component = () => ({
        component: this.asyncComponent(),
        loading: LoadingSpinner,
        error: LoadingError,
        timeout: 3000
      })
    },
    onHistoryBack () {
      this.$store.dispatch('ui/closeAll')
    }
  },
  computed: {
    ...mapGetters({
      sidebarPath: 'ui/getSidebarPath',
      sidebarAnimation: 'ui/getSidebarAnimation'
    }),
    hasSubmenu () {
      return this.sidebarPath.length > 0
    },
    sidebarLength () {
      return this.sidebarAnimation ? this.sidebarPath.length - 1 : this.sidebarPath.length
    },
    translateX () {
      const translateX = this.sidebarLength > 0 ? (this.sidebarLength) * -100 : 0
      return this.hasSubmenu ? { transform: `translateX(${translateX}%)` } : {}
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

.left-sidebar,
.right-sidebar {
  top: 0;
  z-index: $z-index-modal;
  height: 100vh;
  max-height: 100vh;
  width: 460px;
  overflow: auto;

  &.wide {
    width: 800px;
  }

  @media (max-width: 767px) {
    width: 100vh;
  }
}

.left-sidebar{
  left: 0;
}

.right-sidebar{
  right: 0;
}

.sidebar .submenu-wrapper {
  position: relative;
  transition: transform .5s;
}
</style>
