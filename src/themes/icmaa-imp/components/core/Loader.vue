<template>
  <div v-if="isVisible" class="loader-overlay t-z-50 t-fixed t-top-0 t-left-0 t-w-full t-h-full t-flex t-items-center t-justify-center" data-test-id="Loader">
    <div class="t-flex t-flex-wrap t-item-center t-justify-center">
      <div class="loader color-pulse-ball t-bg-primary" />
      <div class="t-w-full t-text-center t-text-sm t-text-primary t-max-w-screen-75 t--mt-3 t-bg-white t-px-4 t-py-2" v-if="message">
        {{ message }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Loader',
  data () {
    return {
      message: null
    }
  },
  methods: {
    show (message = null) {
      this.message = message
      this.$store.commit('ui/setLoader', true)
    },
    hide () {
      this.$store.commit('ui/setLoader', false)
    }
  },
  computed: mapState({
    isVisible: state => state.ui.loader
  }),
  beforeMount () {
    this.$bus.$on('notification-progress-start', this.show)
    this.$bus.$on('notification-progress-stop', this.hide)
  },
  beforeDestroy () {
    this.$bus.$off('notification-progress-start', this.show)
    this.$bus.$off('notification-progress-stop', this.hide)
  }
}
</script>

<style lang="scss" scoped>
/**
 * @source https://theanam.github.io/css-only-loaders/
 */

 .loader-overlay {
   background: rgba(255,255,255,0.75);
 }

.loader, .loader:before, .loader:after{
  box-sizing: border-box;
  flex-grow: 0;
  flex-shrink: 0;
}

.loader.color-pulse-ball {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  animation: pulse 2s infinite ease;
}

@keyframes pulse {
  0%, 1% {
    opacity: 1;
    transform: scale(0.1);
  }
  100% {
    opacity: 0;
    transform: scale(1);
  }
}

</style>
