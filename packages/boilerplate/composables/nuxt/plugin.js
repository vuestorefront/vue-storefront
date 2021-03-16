import { integrationPlugin } from '@vue-storefront/core';

const moduleOptions = JSON.parse('<%= JSON.stringify(options) %>');

export default integrationPlugin(({ integration }) => {
  integration.configure('boilerplate', {
    ...moduleOptions
    // other options
  });
});
