import Vue from 'vue'

export default Vue.directive('focus-clean', {
  inserted: function (el, binding) {
    let mouseDown = false
    let css = binding.value && binding.value.class ? binding.value.class : false
    let timeout = binding.value && binding.value.delay ? binding.value.delay : 1000

    el.addEventListener('mousedown', () => {
      mouseDown = true
    })

    el.addEventListener('mouseup', (event) => {
      mouseDown = false

      css && setTimeout(() => {
        event.target.blur()
        event.target.classList.remove(css)
      }, timeout)
    })

    el.addEventListener('focus', (event) => {
      if (mouseDown) {
        if (css) {
          event.target.classList.add(css)
        } else {
          event.target.blur()
        }
      }
    })
  }
})
