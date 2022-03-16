import nuxtModule from '../nuxt';
import renderRouteCallback from '../nuxt/renderRouteCallback';

/**
 * Variables
 */
const mockNuxt = {
  nuxt: {
    hook: jest.fn()
  }
};

/**
 * Mocks
 */
jest.mock('../nuxt/renderRouteCallback', () => jest.fn(() => 12));

describe('nuxtModule', () => {
  it('calls hook after render', () => {
    const options = {};

    nuxtModule.call(mockNuxt, options);
    expect(mockNuxt.nuxt.hook).toBeCalledWith('render:route', 12);
    expect(renderRouteCallback).toBeCalledWith(options);
  });
});
