
import { configureContext } from '@vue-storefront/core'
import { useContext as useBaseContext } from '@nuxtjs/composition-api';

const contextPlugin = (ctx, inject) => {
  const sharedMap = new Map();

  const useVSFContext = () => {
    const { $vsf, ...context } = useBaseContext();

    return { $vsf, ...context, ...$vsf }
  }

  configureContext({ useVSFContext });
  inject('sharedRefsMap', sharedMap)
};

export default contextPlugin;
