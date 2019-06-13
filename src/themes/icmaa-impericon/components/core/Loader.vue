<template>
  <div class="loader-container fixed" v-if="isVisible">
    <div class="loader-inner-container fixed">
      <div class="spinner relative">
        <div class="double-bounce1 absolute w-100 brdr-circle bg-cl-th-success" />
        <div class="double-bounce2 absolute w-100 brdr-circle bg-cl-th-success" />
      </div>
      <div
        class="loader-message-container mt15 py5 px15 align-center h6 cl-white"
        v-if="message"
      >
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
@import '~theme/css/base/global_vars';
@import '~theme/css/variables/colors';
@import '~theme/css/helpers/functions/color';
$color-container-bg: color(black);
$color-message-bg: color(success);
$z-index-loader: map-get($z-index, loader);

.loader-container {
  z-index: $z-index-loader;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba($color-container-bg, 0.65);
}

.loader-inner-container {
  left: 50%;
  top: 50%;
  transform: translateY(-50%) translateX(-50%);
}

.loader-message-container {
  background-color: rgba($color-message-bg, 0.75);
  border-radius: 50px;
  letter-spacing: 0.5px;
}

.spinner {
  width: 40px;
  height: 40px;
  margin: 0 auto;
}

.double-bounce1,
.double-bounce2 {
  height: 100%;
  opacity: 0.6;
  top: 0;
  left: 0;
  -webkit-animation: sk-bounce 2s infinite ease-in-out;
  animation: sk-bounce 2s infinite ease-in-out;
}

.double-bounce2 {
  -webkit-animation-delay: -1s;
  animation-delay: -1s;
}

@-webkit-keyframes sk-bounce {
  0%,
  100% {
    -webkit-transform: scale(0);
  }
  50% {
    -webkit-transform: scale(1);
  }
}

@keyframes sk-bounce {
  0%,
  100% {
    transform: scale(0);
    -webkit-transform: scale(0);
  }
  50% {
    transform: scale(1);
    -webkit-transform: scale(1);
  }
}
</style>
