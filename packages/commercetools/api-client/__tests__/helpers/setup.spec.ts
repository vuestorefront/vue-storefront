/* eslint-disable camelcase, @typescript-eslint/camelcase */
import { setup } from './../../src/index';
import createCommerceToolsLink from './../../src/helpers/createCommerceToolsLink';

describe('[commercetools-api-client] setup', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('creating link is being called when configuration is provided', () => {
    setup({ api: 'api-config' } as any);
    expect(createCommerceToolsLink).toBeCalled();
  });
});
