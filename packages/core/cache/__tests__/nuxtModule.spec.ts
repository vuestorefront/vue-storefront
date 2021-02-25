import nuxtModule from '../nuxt';
import path from 'path';

/**
 * Variables
 */
const mockNuxt = {
  nuxt: {
    renderer: {
      renderRoute: jest.fn()
    }
  },

  addPlugin: jest.fn(),

  addServerMiddleware: jest.fn(({ handler }) => {
    // Simulate request to invalidation endpoint
    handler({}, { writeHead: jest.fn(), end: jest.fn() });
  })
};

const mockInvoke = jest.fn();
const mockInvalidate = jest.fn();
const mockHandler = jest.fn(() => ['a', 'b', 'c', 'a', 'b', 'c']);

/**
 * Mocks
 */
jest.mock('@vue-storefront/core');
jest.mock('path');
jest.mock('../nuxt/helpers.js', () => ({
  requirePackage: jest.fn(() => ({})),
  requireDriver: jest.fn(() => ({
    invoke: mockInvoke,
    invalidate: mockInvalidate
  }))
}));

describe('nuxtModule', () => {
  it('registers plugin and calls driver methods', () => {
    const options = {
      invalidation: {
        endpoint: '/endpoint',
        handlers: [
          mockHandler
        ]
      },
      driver: [
        '@scope/driver',
        {
          driverSettings: 'setting'
        }
      ]
    };

    // Run module
    nuxtModule.call(mockNuxt, options);

    // Nuxt.js plugin should be called
    expect(mockNuxt.addPlugin).toHaveBeenCalledWith({
      src: path.resolve(__dirname, '../nuxt/plugin.js'),
      mode: 'server',
      options
    });

    // Simulate route render
    mockNuxt.nuxt.renderer.renderRoute('/', {}, jest.fn());

    // Driver's "invoke" should be called
    expect(mockInvoke).toBeCalled();

    // Driver's "invalidate" should be called without duplicate tags
    expect(mockInvalidate).toHaveBeenCalledWith(
      expect.objectContaining({ tags: ['a', 'b', 'c'] })
    );

    // Handler passed to options should be called
    expect(mockHandler).toBeCalled();
  });
});
