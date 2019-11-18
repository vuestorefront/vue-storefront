<template>
  <transition name="back-to-top-fade">
    <div
      v-show="visible"
      v-scroll-to="{ el: '#app', onDone: backToTop }"
      class="back-to-top t-z-10 t-fixed t-right-0 t-cursor-pointer t-pb-4 t-pr-4"
      :style="{ bottom: `${bottom}px` }"
    >
      <slot>
        <div class="t-h-12 t-w-12 t-flex t-items-center t-justify-center t-bg-base-dark">
          <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd">
            <path d="M23.245 20l-11.245-14.374-11.219 14.374-.781-.619 12-15.381 12 15.391-.755.609z" fill="white" />
          </svg>
          <span class="t-sr-only" v-text="text" />
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
    visibleOffset: {
      type: Number,
      default: 100
    },
    visibleOffsetBottom: {
      type: Number,
      default: 64
    },
    scrollFn: {
      type: Function,
      default: function (eventObject) {}
    }
  },
  data () {
    return {
      visible: false,
      bottom: 0,
      pastTopOffset: false,
      pastBottomOffset: false
    }
  },
  mounted () {
    window.addEventListener('scroll', this.catchScroll)
  },
  destroyed () {
    window.removeEventListener('scroll', this.catchScroll)
  },
  methods: {
    catchScroll () {
      const bottomOffset = (document.body.offsetHeight - (window.innerHeight + window.pageYOffset) - parseInt(this.visibleOffsetBottom)) * -1
      this.bottom = bottomOffset > 0 ? bottomOffset : 0

      this.pastTopOffset = window.pageYOffset > parseInt(this.visibleOffset)
      this.pastBottomOffset = window.innerHeight + window.pageYOffset >= document.body.offsetHeight - parseInt(this.visibleOffsetBottom)
      this.visible = this.pastTopOffset

      this.scrollFn(this)
    },
    backToTop () {
      this.$emit('scrolled')
    }
  }
}
</script>
<style lang="scss">
  .back-to-top-fade-enter,
  .back-to-top-fade-leave-to {
    opacity: 0;
  }

  .back-to-top {
    transition: 'opacity' .7s, 'bottom' .5s;
  }
</style>
