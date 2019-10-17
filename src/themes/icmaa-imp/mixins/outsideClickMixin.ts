/**
 * Look at the following blog post to see how it is done exactly.
 * We customized it a bit to make the syntax a bit more intuitive.
 * @see https://tahazsh.com/detect-outside-click-in-vue
 */

let handleOutsideClick

export default {
  directives: {
    outside: {
      bind (el, binding, vnode) {
        // Here's the click/touchstart handler
        // (it is registered below)
        handleOutsideClick = (e) => {
          e.stopPropagation()
          // Get the handler method name and the exclude array
          // from the object used in v-closable
          const v = binding.value

          // Set defaults
          const exclude = v.exclude || []
          const handler = v.handler || v || 'outsideClick'

          // This variable indicates if the clicked element is excluded
          let clickedOnExcludedEl = false
          exclude.forEach(refName => {
            // We only run this code if we haven't detected
            // any excluded element yet
            if (!clickedOnExcludedEl) {
              // Get the element using the reference name
              const excludedEl = vnode.context.$refs[refName]
              // See if this excluded element
              // is the same element the user just clicked on
              clickedOnExcludedEl = excludedEl.contains(e.target)
            }
          })

          // We check to see if the clicked element is not
          // the dialog element and not excluded
          if (!el.contains(e.target) && !clickedOnExcludedEl) {
            // If the clicked element is outside the dialog
            // and not the button, then call the outside-click handler
            // from the same component this directive is used in
            if (typeof handler !== 'function') {
              vnode.context[handler]()
            } else {
              handler()
            }
          }
        }
        // Register click/touchstart event listeners on the whole page
        document.addEventListener('click', handleOutsideClick)
        document.addEventListener('touchstart', handleOutsideClick)
      },

      unbind () {
        // If the element that has v-closable is removed, then
        // unbind click/touchstart listeners from the whole page
        document.removeEventListener('click', handleOutsideClick)
        document.removeEventListener('touchstart', handleOutsideClick)
      }
    }
  }
}
