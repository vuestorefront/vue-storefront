import Vue from 'vue';

const cypressPlugin = (ctx) => {
  Vue.directive('cypress', {
    bind: (element, binding) => {
      console.log({
        1: binding.value,
        element
      });
      ctx.isDev && element.setAttribute(`data-cypress`, binding.value);
    }
  });
};

export default cypressPlugin;
