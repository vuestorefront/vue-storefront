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
              <slot name="header"/>
            </header>
            <div class="modal-content pt30 pb60 px65" v-if="$slots.content || staticData">
              <slot name="content"/>
              <static-content :file="staticData" v-if="staticData"/>
            </div>
            <slot/>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import StaticContent from 'theme/components/theme/StaticContent'
import Modal from '@vue-storefront/core/components/Modal'

export default {
  components: {
    StaticContent
  },
  mixins: [Modal],
  props: {
    staticData: {
      type: String,
      default: ''
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
