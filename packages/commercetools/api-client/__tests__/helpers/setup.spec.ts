/* eslint-disable camelcase, @typescript-eslint/camelcase */
import { setup } from './../../src/index';
import createCommerceToolsLink from './../../src/helpers/createCommerceToolsLink';

describe('[commercetools-api-client] setup', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('set configuration with given api', () => {
    (createCommerceToolsLink as any).mockImplementation((arg) => {
      expect(arg).toEqual('api-config');

      return 'createCommerceToolsLink';
    });

    setup({ api: 'api-config' } as any);
  });

  it('set configuration without api', () => {
    setup({} as any);
    expect(createCommerceToolsLink).not.toBeCalled();
  });
});
