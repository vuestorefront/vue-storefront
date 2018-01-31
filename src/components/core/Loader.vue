<template>

  <div class="loader-container" v-if="isVisible">

    <div class="loader-inner-container">

      <div class="spinner">
        <div class="double-bounce1"/>
        <div class="double-bounce2"/>
      </div>

      <div class="loader-message-container" v-if="message">
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
  mounted () {
    this.$bus.$on('notification-progress-start', (message) => {
      this.show(message)
    })
    this.$bus.$on('notification-progress-stop', this.hide)
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
        background-color: rgba(0, 0, 0, 0.65);

    }

    .loader-inner-container {

        left: 50%;
        top: 50%;
        position: fixed;
        transform: translateY(-50%) translateX(-50%);

    }

    .loader-message-container {

        margin-top: 15px;
        background-color: rgba(65, 184, 130, 0.75);
        color: #f5f5f5;
        text-align: center;
        padding: 6px 15px;
        border-radius: 50px;
        font-size: 12px;
        letter-spacing: 0.5px;

    }

    .spinner {

        width: 40px;
        height: 40px;
        position: relative;
        margin: 0 auto;

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
        0%, 100% {
            -webkit-transform: scale(0.0)
        }
        50% {
            -webkit-transform: scale(1.0)
        }
    }

    @keyframes sk-bounce {
        0%, 100% {
            transform: scale(0.0);
            -webkit-transform: scale(0.0);
        }
        50% {
            transform: scale(1.0);
            -webkit-transform: scale(1.0);
        }
    }

</style>
