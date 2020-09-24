
import { registerLogger } from '@vue-storefront/core'

const loggerPlugin = () => {
  const { verbosity, ...args } = <%= serialize(options) %>;
  registerLogger(args, verbosity || 'error')
};

export default loggerPlugin;
