
import { registerLogger } from '@vue-storefront/core'

const loggerPlugin = () => {
  console.log('registering logger plugin');
  registerLogger(<%= serialize(options) %>)
};

export default loggerPlugin;
