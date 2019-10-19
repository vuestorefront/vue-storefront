<template>
  <div class="sidebar-menu t-w-full t-min-h-screen t-max-h-screen t-overflow-y-auto t-scrolling-touch t-flex t-flex-col" ref="container">
    <div class="t-h-60px t-flex-fix t-px-2 t-bg-white t-border-b t-border-base-lighter t-flex">
      <slot name="top" />
      <h2 class="t-self-center t-pl-2 t-text-lg t-text-base-dark" v-if="title" v-text="title" />
      <div class="t-flex-expand" />
      <top-button icon="close" text="Close" :tab-index="1" @click.native="closeMenu" class="t-text-base" />
    </div>
    <div @click="closeAfterClick" class="sidebar-content t-p-4">
      <slot />
    </div>
    <slot name="footer" />
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import { currentStoreView } from '@vue-storefront/core/lib/multistore'
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock'
import onEscapePress from '@vue-storefront/core/mixins/onEscapePress'

import TopButton from 'theme/components/theme/blocks/AsyncSidebar/TopButton'

export default {
  name: 'Sidebar',
  props: {
    title: {
      type: [Boolean, String],
      default: false
    },
    closeOnClick: {
      type: Boolean,
      default: true
    }
  },
  components: {
    TopButton
  },
  mixins: [ onEscapePress ],
  methods: {
    closeAfterClick () {
      if (this.closeOnClick) {
        this.closeMenu()
      }
    },
    closeMenu () {
      this.$store.dispatch('ui/closeAll')
    },
    onEscapePress () {
      this.closeMenu()
    }
  },
  mounted () {
    disableBodyScroll(this.$refs.container)
  },
  destroyed () {
    clearAllBodyScrollLocks()
  }
}
</script>

<style lang="scss" scoped>

.top {
  height: 60px;
}

</style>
