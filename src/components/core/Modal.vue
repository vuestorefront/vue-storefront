<template>
  <div class="modal"
       v-if="isVisible"
       ref="modal"
       @click.self="close">
    <slot name="close"><button @click="close"> X </button></slot>
    <slot/>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: 'Modal',
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
    delay: {
      required: false,
      type: Number,
      default: 300
    }
  },
  beforeMount () {
    this.$bus.$on('modal.toggle', (name, state, params) => {
      if (name === this.name) {
        state = typeof state === 'undefined' ? !this.isVisible : state
        this.toggle(state)
      }
    })

    this.$bus.$on('modal.show', (name, state, params) => name === this.name ? this.toggle(true) : false)
    this.$bus.$on('modal.hide', (name, state, params) => name === this.name ? this.toggle(false) : false)
  },
  methods: {
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
  }
}
</script>
