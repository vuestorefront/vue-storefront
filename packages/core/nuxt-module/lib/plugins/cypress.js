import Vue from 'vue';

const cypressPlugin = (ctx) => {
  Vue.directive('cypress', {
    bind: (element, binding) => ctx.isDev && element.setAttribute(`data-cypress`, binding.value)
  });
};

export default cypressPlugin;
