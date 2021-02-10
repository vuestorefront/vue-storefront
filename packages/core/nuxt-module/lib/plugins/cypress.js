import Vue from 'vue';

const cypressPlugin = (ctx) => {
  Vue.directive('cypress', {
    bind: (element, binding) => {
      const enabled = ctx.isDev || ctx.env.NUXT_ENV_CYPRESS === true.toString();

      return enabled && element.setAttribute(`data-cypress`, binding.value);
    }
  });
};

export default cypressPlugin;
