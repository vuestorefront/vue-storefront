import { isServer } from '@vue-storefront/core/helpers'

const isBottomVisible = () => {
  if (isServer) {
    return false
  }
  const SAFETY_MARGIN = 20
  const scrollY = window.scrollY
  const visible = window.innerHeight
  const pageHeight = document.documentElement.scrollHeight
  const bottomOfPage = scrollY + SAFETY_MARGIN >= pageHeight - visible

  return bottomOfPage || pageHeight < visible
}

/**
 * By implementing this mixin add "onBottomScroll" method in component.
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
