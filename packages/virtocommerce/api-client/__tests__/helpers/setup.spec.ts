import { setup } from '../../src';
import createVirtoCommerceLink from './../../src/helpers/create-virtocommerce-link';

describe('[virtocommerce-api-client] setup', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('set configuration without api', () => {
    setup({ api: null } as any);
    expect(createVirtoCommerceLink).not.toBeCalled();
  });

  it('creating link is being called when configuration is provided', () => {
    setup({ api: 'api-config' } as any);
    expect(createVirtoCommerceLink).toBeCalled();
  });
});
