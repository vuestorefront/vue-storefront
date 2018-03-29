import Vue from 'vue'

export default Vue.directive('img-placeholder', {
  bind: function (el, binding) {
    const src = el.src
    const img = new Image()
    el.src = binding.value
    img.src = src

    img.onload = () => {
      el.src = img.src
    }
  }
})
