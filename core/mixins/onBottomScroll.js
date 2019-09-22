import { isBottomVisible } from '@vue-storefront/core/helpers'

/**
 * By implementing this mixin add "onBottomScroll" mthod in component.
 * It will be invoked when view reach the bottom.
 */
export default {
  mounted () {
    const scrollHandler = () => {
      if (isBottomVisible()) {
        this.onBottomScroll()
      }
    }
    document.addEventListener('scroll', scrollHandler)
    this.$once('hook:destroyed', () => {
      document.removeEventListener('scroll', scrollHandler)
    })
  }
}
