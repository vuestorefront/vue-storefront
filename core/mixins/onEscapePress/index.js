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
