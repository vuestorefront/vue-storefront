<template>
  <transition name="fade-in-down">
    <div
      class="modal"
      v-if="isVisible"
      ref="modal"
      @click.self="close"
    >
      <div class="modal-wrapper">
        <div class="modal-center">
          <div class="modal-container bg-cl-primary" ref="modal-content" :style="style">
            <header class="modal-header py25 px65 h1 serif weight-700 bg-cl-secondary" v-if="$slots.header">
              <i
                slot="close"
                class="modal-close material-icons p15 cl-bg-tertiary"
                @click="close"
                data-testid="closeModalButton"
              >
                close
              </i>
              <slot name="header" />
            </header>
            <div class="modal-content pt30 pb60 px65" v-if="$slots.content">
              <slot name="content" />
            </div>
            <slot />
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapMutations } from 'vuex'
import onEscapePress from '@vue-storefront/core/mixins/onEscapePress'

export default {
  name: 'Modal',
  data () {
    return {
      isVisible: false
    }
  },
  methods: {
    onHide (name, state, params) {
      return name === this.name ? this.toggle(false) : false
    },
    onShow (name, state, params) {
      return name === this.name ? this.toggle(true) : false
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
    ...mapMutations('ui', [
      'setOverlay'
    ]),
    toggle (state) {
      this.isVisible = state
      state ? this.setOverlay(state) : setTimeout(() => this.setOverlay(state), this.delay)
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
  },
  mixins: [onEscapePress],
  props: {
    name: {
      required: true,
      type: String
    },
    delay: {
      required: false,
      type: Number,
      default: 300
    },
    width: {
      type: Number,
      default: 0
    }
  },
  computed: {
    style () {
      return this.width ? `width: ${this.width}px` : false
    }
  }
}
</script>

<style lang="scss">
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
  text-align: inherit;

  .modal-wrapper {
    display: table;
    height: 100%;
    width: 100%;
    table-layout: fixed;
    pointer-events: none;
  }

  .modal-center {
    display: table-cell;
    vertical-align: middle;
  }

  .modal-container {
    width: 945px;
    margin: 0 auto;
    max-width: 100%;
    max-height: 100%;
    z-index: $z-index-modal+1;
    pointer-events: auto;

    @media (max-width: 600px) {
      min-height: 100%;
      min-width: 100%;
      margin: 0;
    }
  }

  .modal-header {
    position: relative;

    > * {
        margin: 0;
    }

    @media (max-width: 600px) {
      padding: 25px 20px;
    }
  }

  .modal-content {
    @media (max-width: 600px) {
      padding: 30px 20px;
    }
  }

  .modal-close {
    position: absolute;
    cursor: pointer;
    right: 0;
    top: 0;
  }
}
</style>
