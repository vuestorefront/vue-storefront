<template>
  <transition name="fade-in-down">
    <div class="modal" v-if="isVisible">
      <div class="modal-backdrop" @click="close" />
      <div class="modal-container t-bg-white t-scrolling-touch t-pb-20 sm:t-pb-0" ref="modal-container" :style="style">
        <div class="t-h-60px t-flex-fix t-px-4 t-bg-white t-border-b t-border-base-lighter t-flex t-items-center">
          <slot name="header-before" />
          <h2 class="t-text-lg t-text-base-dark" v-if="title" v-text="title" />
          <slot name="header" />
          <div class="t-flex-expand" />
          <top-button icon="close" text="Close" :tab-index="1" @click.native="close" class="t--mr-2 t-text-base" />
        </div>
        <div class="modal-content" :class="[ padding ]">
          <slot />
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapMutations } from 'vuex'
import onEscapePress from '@vue-storefront/core/mixins/onEscapePress'
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock'

import TopButton from 'theme/components/theme/blocks/AsyncSidebar/TopButton'

export default {
  name: 'Modal',
  mixins: [onEscapePress],
  components: {
    TopButton
  },
  data () {
    return {
      isVisible: false
    }
  },
  props: {
    name: {
      required: true,
      type: String
    },
    title: {
      type: [Boolean, String],
      default: false
    },
    delay: {
      required: false,
      type: Number,
      default: 300
    },
    width: {
      type: Number,
      default: 0
    },
    padding: {
      type: String,
      default: 't-p-4 lg:t-p-8'
    }
  },
  computed: {
    style () {
      return this.width ? `width: ${this.width}px` : false
    }
  },
  watch: {
    isVisible (state) {
      if (state) {
        this.$nextTick(() => {
          disableBodyScroll(this.$refs['modal-container']);
        })
      } else {
        clearAllBodyScrollLocks();
      }
    }
  },
  methods: {
    ...mapMutations('ui', ['setOverlay']),
    onHide (name, state, params) {
      if (name === this.name) {
        this.toggle(false)
      }
    },
    onShow (name, state, params) {
      if (name === this.name) {
        this.toggle(true)
      }
    },
    onToggle (name, state, params) {
      if (name === this.name) {
        state = typeof state === 'undefined' ? !this.isVisible : state
        this.toggle(state)
      }
    },
    onEscapePress () {
      this.close()
    },
    toggle (state) {
      this.isVisible = state
      state ? this.setOverlay(state) : setTimeout(() => this.setOverlay(state), this.delay)
      this.$emit(state ? 'show' : 'close', this)
    },
    close () {
      this.toggle(false)
    }
  },
  beforeMount () {
    this.$bus.$on('modal-toggle', this.onToggle)
    this.$bus.$on('modal-show', this.onShow)
    this.$bus.$on('modal-hide', this.onHide)
  },
  beforeDestroy () {
    this.$bus.$off('modal-toggle', this.onToggle)
    this.$bus.$off('modal-show', this.onShow)
    this.$bus.$off('modal-hide', this.onHide)
  }
}
</script>

<style lang="scss" scoped>
@import '~theme/css/base/global_vars';
$z-index-modal: map-get($z-index, modal);

.modal {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: auto;
  z-index: $z-index-modal;

  /** Vertical-/Horizontal-Center */
  display: flex;
  -ms-flex-pack: center;
  justify-content: center;
  -ms-flex-align: center;
  align-items: center;

  .modal-container {
    width: 945px;
    margin: 0 auto;
    max-width: 100vw;
    max-height: 100vh;
    z-index: $z-index-modal + 1;
    overflow: auto;

    @media (max-width: 600px) {
      /**
       * Fix viewport vh bug in mobile browsers
       * @see https://css-tricks.com/the-trick-to-viewport-units-on-mobile/
       */
      min-height: 100vh;
      min-height: calc(var(--vh, 1vh) * 100);
      max-height: calc(var(--vh, 1vh) * 100);
      min-width: 100vw;
      margin: 0;
    }
  }

  .modal-backdrop{
    position: absolute;
    top: 0;
    left: 0;
    width:100%;
    height: 100%;
  }
}
</style>
