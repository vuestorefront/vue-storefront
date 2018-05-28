// After injecting this mixin create onEscapePress function in your component
// which will be fired after pressing Esc key and put the desired logic inside it
export default {
  mounted () {
    const keydownHandler = (e) => {
      // for old browser support as a fallback
      if (e.key === 'Escape' || e.key === 'Esc' || e.keyCode === 27) {
        this.onEscapePress()
      }
    }
    document.addEventListener('keydown', keydownHandler)
    this.$once('hook:desktroyed', () => {
      document.removeEventListener('keydown', keydownHandler)
    })
  }
}
