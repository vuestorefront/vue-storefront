import { registerLogger } from '@vue-storefront/core'

export default function loggerPlugin(ctx) {
  const { customLogger, ...options } = <%= serialize(options) %>;

  registerLogger(
    options,
    customLogger
  );
};
