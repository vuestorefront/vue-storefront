
import { configureContext } from '@vue-storefront/core'
import { useContext as useBaseContext } from '@nuxtjs/composition-api';

const createVsfContext = (context) => Object.entries(context)
  .filter(([key]) => key.includes('$vsf'))
  .reduce((prev, [key, val]) => ({
    ...prev,
    ['$' + key.substr(4).toLowerCase()]: val
  }), {});

const filterOutVsfFields = (context) => Object.entries(context)
  .filter(([key]) => !key.includes('$vsf'))
  .reduce((prev, [key, val]) => ({
    ...prev,
    [key]: val
  }), {});

const contextPlugin = (ctx, inject) => {
  const sharedMap = new Map();

  const useContext = () => {
    const baseContext = useBaseContext();
    const vsfContext = createVsfContext(baseContext);
    const context = filterOutVsfFields(baseContext)

    return { ...context, ...vsfContext }
  }

  configureContext({ useContext });
  inject('sharedRefsMap', sharedMap)
};

export default contextPlugin;
