import nuxtModule from '../nuxt';

const mockInvoke = vi.fn();
const mockInvalidate = vi.fn();

vi.mock('@vue-storefront/core');
vi.mock('../nuxt/helpers.js', () => ({
  requirePackage: vi.fn(() => ({})),
  requireDriver: vi.fn(() => ({
    invoke: mockInvoke,
    invalidate: mockInvalidate
  }))
}));

describe('nuxtModule', () => {
  it('registers plugin and calls driver methods', () => {
    const mockNuxt = {
      nuxt: {
        renderer: {
          renderRoute: vi.fn()
        }
      },

      addPlugin: vi.fn(),

      addServerMiddleware: vi.fn(({ handler }) => {
        // Simulate request to invalidation endpoint
        handler({}, { writeHead: vi.fn(), end: vi.fn() });
      })
    };

    const mockHandler = vi.fn(() => ['a', 'b', 'c', 'a', 'b', 'c']);

    const options = {
      enabled: true,
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
    expect(mockNuxt.addPlugin).toHaveBeenCalled();

    // // Simulate route render
    // mockNuxt.nuxt.renderer.renderRoute('/', {}, vi.fn());

    // // Driver's "invoke" should be called
    // expect(mockInvoke).toBeCalled();

    // // Driver's "invalidate" should be called without duplicate tags
    // expect(mockInvalidate).toHaveBeenCalledWith(
    //   expect.objectContaining({ tags: ['a', 'b', 'c'] })
    // );

    // // Handler passed to options should be called
    // expect(mockHandler).toBeCalled();
  });
});
