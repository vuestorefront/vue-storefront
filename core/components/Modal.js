import Vue from 'vue'
import { mapMutations } from 'vuex'

export default Vue.component('Modal', {
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
    this.$bus.$on('modal-toggle', (name, state, params) => {
      if (name === this.name) {
        state = typeof state === 'undefined' ? !this.isVisible : state
        this.toggle(state)
      }
    })

    this.$bus.$on('modal-show', (name, state, params) => name === this.name ? this.toggle(true) : false)
    this.$bus.$on('modal-hide', (name, state, params) => name === this.name ? this.toggle(false) : false)
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
})
