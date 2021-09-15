import Vue from 'vue';

const e2eTestingPlugin = (ctx) => {
  Vue.directive('e2e', {
    bind: (element, binding) => {
      const enabled = ctx.isDev || ctx.env.NUXT_ENV_E2E === true.toString();

      return enabled && element.setAttribute(`data-e2e`, binding.value);
    }
  });
};

export default e2eTestingPlugin;