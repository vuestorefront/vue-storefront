<template>
    <transition name="fade-in-down">
        <div class="modal modal-wrapper flex center-xs middle-xs"
            v-if="isVisible"
            ref="modal-wrapper"
            @click.self="close">
            <div class="modal-container" ref="modal" :style="style">
                <header class="modal-header py25 px65 h1 serif weight-700 bg-lightgray" v-if="$slots.header">
                    <i slot="close" class="modal-close material-icons p15 c-gray" @click="close">close</i>
                    <slot name="header"></slot>
                </header>
                <div class="modal-content pt30 pb60 px65 bg-white" v-if="$slots.content">
                    <slot name="content"></slot>
                </div>
                <slot/>
            </div>
        </div>
    </transition>
</template>

<script>
import { coreComponent } from 'lib/themes'

export default {
  mixins: [coreComponent('core/Modal')],
  props: {
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
@import '~theme/css/global_vars';
$z-index-modal: map-get($z-index, modal);

.modal-wrapper {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    overflow: auto;
    z-index: $z-index-modal;
    text-align: inherit;
}

.modal-container {
    width: 945px;
    max-width: 100%;
    margin: 15px;
    z-index: $z-index-modal+1;

    @media (max-width: 600px) {
      display: flex;
      flex-direction: column;
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
}

.modal-content {
    flex: 1;
}

.modal-close {
    position: absolute;
    cursor: pointer;
    right: 0;
    top: 0;
}
</style>