import Vue from 'vue';

Vue.directive('cypress', {
  bind(element, binding) {
    element.setAttribute(`data-cypress`, binding.value);
  }
});
