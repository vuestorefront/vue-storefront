
import { configureContext } from '@vue-storefront/core'
import { useContext} from '@nuxtjs/composition-api';

const contextPlugin = () => {
  configureContext({ useContext });
};

export default contextPlugin;
