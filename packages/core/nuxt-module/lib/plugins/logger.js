import { registerLogger } from '@vue-storefront/core'

const loggerPlugin = (app) => {
  const { verbosity, customLogger, ...args } = <%= serialize(options) %>;
  registerLogger(customLogger || args, verbosity || 'error')
};

export default loggerPlugin;
