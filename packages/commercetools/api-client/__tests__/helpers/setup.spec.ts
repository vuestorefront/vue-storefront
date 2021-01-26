import { createApiClient } from './../../src/index.server';
import { createApiProxy } from './../../src/index.client';

jest.mock('apollo-client');
jest.mock('@commercetools/sdk-auth');

describe('[commercetools-api-client] setup', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('creates instance for direct connection', () => {
    createApiClient({ api: 'api-config' } as any);
  });

  it('creates instance for proxy connection', () => {
    createApiProxy({ api: 'api-config' } as any);
  });
});
