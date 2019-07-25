import { isServer } from '@vue-storefront/core/helpers'

const isBottomVisible = () => {
  if (isServer) {
    return false
  }
  const scrollY = window.scrollY
  const visible = window.innerHeight
  const pageHeight = document.documentElement.scrollHeight
  const bottomOfPage = visible + scrollY >= pageHeight

  return bottomOfPage || pageHeight < visible
}

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
