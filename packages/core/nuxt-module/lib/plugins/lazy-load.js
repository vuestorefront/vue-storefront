import Vue from 'vue';
import VueLazyload from 'vue-lazyload';

const lazyloadPlugin = () => {
  const { lazyload: options } = <%= serialize(options) %>;
  Vue.use(VueLazyload, options);
}

export default lazyloadPlugin;
