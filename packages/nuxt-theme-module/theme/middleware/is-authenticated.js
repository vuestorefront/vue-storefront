import { Logger } from '@vue-storefront/core';

export default () => {
  Logger.error('Please implement vendor-specific is-authenticated.js middleware in the \'middleware\' directory to block guests from accessing user profile routes');
};
