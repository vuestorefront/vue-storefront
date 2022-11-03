import { apiClientFactory } from '@vue-storefront/core';
import * as api from './api';

const onCreate = () => {
  return {
    config: {},
    client: null
  };
};

const { createApiClient } = apiClientFactory({
  onCreate,
  api
});

export {
  createApiClient
};
