<template>
  <transition name="back-to-top-fade">
    <div
      class="vue-back-to-top"
      :style="{bottom: bottom, right: right} "
      v-show="visible"
      @click="backToTop"
    >
      <slot>
        <div class="default">
          <span>
            {{ text }}
          </span>
        </div>
      </slot>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'BackToTop',
  props: {
    text: {
      type: String,
      default: 'Back to top'
    },
    visibleoffset: {
      type: [String, Number],
      default: 600
    },
    visibleoffsetbottom: {
      type: [String, Number],
      default: 0
    },
    right: {
      type: String,
      default: '30px'
    },
    bottom: {
      type: String,
      default: '40px'
    },
    scrollFn: {
      type: Function,
      default: function (eventObject) {}
    }
  },
  data () {
    return {
      visible: false
    }
  },
  mounted () {
    window.smoothscroll = () => {
      let currentScroll = document.documentElement.scrollTop || document.body.scrollTop
      if (currentScroll > 0) {
        window.requestAnimationFrame(window.smoothscroll)
        window.scrollTo(0, Math.floor(currentScroll - (currentScroll / 5)))
      }
    }
    window.addEventListener('scroll', this.catchScroll)
  },
  destroyed () {
    window.removeEventListener('scroll', this.catchScroll)
  },
  methods: {
    /**
      * Catch window scroll event
      * @return {void}
      */
    catchScroll () {
      const pastTopOffset = window.pageYOffset > parseInt(this.visibleoffset)
      const pastBottomOffset = window.innerHeight + window.pageYOffset >= document.body.offsetHeight - parseInt(this.visibleoffsetbottom)
      this.visible = parseInt(this.visibleoffsetbottom) > 0 ? pastTopOffset && !pastBottomOffset : pastTopOffset
      this.scrollFn(this)
    },
    /**
      * The function who make the magics
      * @return {void}
      */
    backToTop () {
      window.smoothscroll()
      this.$emit('scrolled')
    }
  }
}
</script>
<style>
  .back-to-top-fade-enter-active,
  .back-to-top-fade-leave-active {
    transition: opacity .7s;
  }

  .back-to-top-fade-enter,
  .back-to-top-fade-leave-to {
    opacity: 0;
  }

  .vue-back-to-top {
    cursor:pointer;
    position: fixed;
    z-index: 1000;
  }

  .vue-back-to-top .default {
    background-color: #f5c85c;
    border-radius: 3px;
    color: #ffffff;
    height: 30px;
    line-height: 30px;
    text-align: center;
    width: 160px;
  }

  .vue-back-to-top .default span{
    color:#ffffff;
  }

  .vue-back-to-top--is-footer {
    bottom: 50% !important;
    position: absolute;
    transform: translateY(50%);
  }
</style>
