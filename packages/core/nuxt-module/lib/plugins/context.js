
import { configureContext } from '@vue-storefront/core'
import { useContext } from '@nuxtjs/composition-api';

const contextPlugin = (ctx, inject) => {
  const sharedMap = new Map();

  configureContext({ useContext });
  inject('sharedRefsMap', sharedMap)
};

export default contextPlugin;
