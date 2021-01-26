import { Logger } from '@vue-storefront/core';

export default () => {
  Logger.warn('Please implement vendor specific authenticated.js middleware in \'middleware\' directory to protect user profile routes from guest users.');

  return true;
};
