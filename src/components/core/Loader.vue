<template>

  <div class="loader-container" v-if="isVisible">

      <div class="spinner">
      <div class="double-bounce1"></div>
      <div class="double-bounce2"></div>
  </div>
  </div>

</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'loader',
  computed: mapState({
    isVisible: state => state.ui.loader
  }),
  methods: {
    show () {
      this.$store.commit('ui/setLoader', true)
    },
    hide () {
      this.$store.commit('ui/setLoader', false)
    }
  }
}
</script>

<style scoped>

  .loader-container {

    position: fixed;
    z-index: 10;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0,0,0,0.65);

  }

  .spinner {

    left: 50%;
    top: 50%;
    position: fixed;
    width: 40px;
    height: 40px;
    margin-left: -20px;
    margin-top: -20px;

  }

  .double-bounce1, .double-bounce2 {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #41b882;
    opacity: 0.6;
    position: absolute;
    top: 0;
    left: 0;

    -webkit-animation: sk-bounce 2.0s infinite ease-in-out;
    animation: sk-bounce 2.0s infinite ease-in-out;
  }

  .double-bounce2 {
    -webkit-animation-delay: -1.0s;
    animation-delay: -1.0s;
  }

  @-webkit-keyframes sk-bounce {
    0%, 100% { -webkit-transform: scale(0.0) }
    50% { -webkit-transform: scale(1.0) }
  }

  @keyframes sk-bounce {
    0%, 100% {
      transform: scale(0.0);
      -webkit-transform: scale(0.0);
    } 50% {
        transform: scale(1.0);
        -webkit-transform: scale(1.0);
      }
  }

</style>
