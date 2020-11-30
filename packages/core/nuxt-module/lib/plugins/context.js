
import { configureContext } from '@vue-storefront/core'
import { useContext as useBaseContext } from '@nuxtjs/composition-api';

const contextPlugin = (ctx, inject) => {
  const sharedMap = new Map();

  const useContext = () => {
    const { $vsf, ...context } = useBaseContext();

    return { ...context, ...$vsf }
  }

  configureContext({ useContext });
  inject('sharedRefsMap', sharedMap)
};

export default contextPlugin;
