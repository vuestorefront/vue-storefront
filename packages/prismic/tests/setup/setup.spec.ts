import { setup } from '../../src/index';
import prismic from 'prismic-javascript';

jest.mock('prismic-javascript');

describe('[prismic] setup', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('configures prismic client', () => {
    const apiOptions = { option: 1 } as any;
    const endpoint = 'https://endpoint.com';

    (prismic.client as any).mockImplementation((arg1, arg2) => {
      expect(arg1).toEqual(endpoint);
      expect(arg2).toEqual(apiOptions);

    });

    setup({
      endpoint,
      apiOptions
    });

    expect(prismic.client).toBeCalled();
  });

  it('configures prismic client with default settings ', () => {
    const apiOptions = null;
    const endpoint = null;

    (prismic.client as any).mockImplementation((arg1, arg2) => {
      expect(arg1).toEqual(null);
      expect(arg2).toEqual(null);
    });

    setup({
      endpoint,
      apiOptions
    });

    expect(prismic.client).toBeCalled();
  });
});
