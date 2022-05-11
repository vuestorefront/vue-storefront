import renderRouteCallback from '../nuxt/renderRouteCallback';

/**
 * Variables
 */
const response = {
  res: {
    setHeader: jest.fn(),
    removeHeader: jest.fn(),
    headersSent: false
  }
};

/**
 * Mocks
 */
jest.mock('../nuxt/isUrlMatchingRule', () => jest.fn(() => true));

describe('renderRouteCallback', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('adds default cache-control header', () => {
    const options = {};

    renderRouteCallback(options)('/', null, response);

    expect(response.res.setHeader).toBeCalledWith('Cache-Control', 'max-age=60');
  });

  it('overrides default cache-control header', () => {
    const options = {
      default: 'max-age=120'
    };

    renderRouteCallback(options)('/', null, response);

    expect(response.res.setHeader).toBeCalledWith('Cache-Control', 'max-age=120');
  });

  it('overrides default cache-control header for specified routes', () => {
    const options = {
      matchRoute: {
        '/p/*': 'max-age=360'
      }
    };

    renderRouteCallback(options)('/p/123', null, response);
    expect(response.res.setHeader).toBeCalledWith('Cache-Control', 'max-age=360');

    response.res.setHeader.mockClear();

    renderRouteCallback(options)('/', null, response);
    expect(response.res.setHeader).toBeCalledWith('Cache-Control', 'max-age=60');
  });

  it('removes cache-control header for blacklisted routes', () => {
    const options = {
      matchRoute: {
        '/c/*': 'none'
      }
    };

    renderRouteCallback(options)('/c/123', null, response);
    expect(response.res.removeHeader).toBeCalledWith('Cache-Control');
  });

  it('does not set headers if they had been sent already', () => {
    const options = {};
    renderRouteCallback(options)('/c/123', null, { res: { ...response.res, headersSent: true }});
    expect(response.res.setHeader).toHaveBeenCalledTimes(0);
  });
});
