/* eslint-disable camelcase, @typescript-eslint/camelcase */
import { createApiClient } from './../../src/index';

jest.mock('apollo-client');
jest.mock('@commercetools/sdk-auth');

describe('[commercetools-api-client] setup', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('creating link is being called when configuration is provided', () => {
    createApiClient({ api: 'api-config' } as any);
  });
});
