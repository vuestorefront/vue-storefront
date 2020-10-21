import { addRedirectTempObject, createRedirectProxy } from './../../ssr-redirect'
import { Context, RedirectTempObject } from './../../types';

// we don't want to show warning in tests
jest.spyOn(console, 'warn').mockImplementation(() => {});

describe('addRedirectTempObject', () => {
  let context: Context
  const response: any = {
    redirect: jest.fn(() => null)
  }

  beforeEach(() => {
    context = {
      url: '/',
      output: {
        prepend: (context) => { return ''; },
        append: (context) => { return ''; },
        filter: (output, context) => { return output },
        appendHead: (context) => { return ''; },
        template: 'default',
        cacheTags: new Set()
      },
      server: {
        app: null,
        response,
        request: null
      },
      meta: null,
      vs: {
        config: null,
        storeCode: ''
      }
    };

    addRedirectTempObject(context, response)
  });

  it('should create temporary object', () => {
    const expectedObject: RedirectTempObject = {
      pendingPath: null,
      isPending: jest.fn(),
      resolver: jest.fn(),
      handler: jest.fn()
    }

    expect(Object.keys(context.server._redirect)).toEqual(expect.arrayContaining(Object.keys(expectedObject)));
  });

  describe('isPending', () => {
    it('should turn in pending state when pendingPath is filled', () => {
      expect(context.server._redirect.isPending()).toEqual(false);

      context.server._redirect.pendingPath = '/checkout'

      expect(context.server._redirect.isPending()).toEqual(true);
    });
  })

  describe('resolver', () => {
    it('should not resolve redirection if its not pending', () => {
      context.server._redirect.resolver(302, '/checkout')

      expect(context.server._redirect).toBeTruthy();
      expect(response.redirect).not.toBeCalled()
    });

    it('should resolve redirection if its pending', () => {
      context.server._redirect.isPending = jest.fn(() => true)

      context.server._redirect.resolver(302, '/checkout')

      expect(context.server._redirect).toBeFalsy();
      expect(response.redirect).toBeCalled()
    });
  })

  describe('handler', () => {
    it('should not set in pending state if current path is same as redirection', () => {
      context.url = '/checkout'

      context.server._redirect.handler('/checkout')

      expect(context.server._redirect.isPending()).toEqual(false)
    });

    it('should set in pending state', () => {
      context.server._redirect.handler('/checkout')

      expect(context.server._redirect.isPending()).toEqual(true)
    });

    it('should set in pending state only once per request', () => {
      context.server._redirect.handler('/checkout')
      context.server._redirect.handler('/checkout2')

      expect(context.server._redirect.isPending()).toEqual(true)
    });

    it('should extend express redirect interface: (path: string): void', () => {
      context.server._redirect.handler('/checkout')

      context.server._redirect.resolver()

      expect(response.redirect).toBeCalledWith(302, '/checkout')
    });

    it('should extend express redirect interface: (code: number, path: string): void', () => {
      context.server._redirect.handler(301, '/checkout')

      context.server._redirect.resolver()

      expect(response.redirect).toBeCalledWith(301, '/checkout')
    });

    it('should extend express redirect interface: (path: string, code: number): void', () => {
      context.server._redirect.handler('/checkout', 301)

      context.server._redirect.resolver()

      expect(response.redirect).toBeCalledWith(301, '/checkout')
    });
  })
});

describe('createRedirectProxy', () => {
  let context: Context
  const response: any = {
    redirect: jest.fn(() => null)
  }

  beforeEach(() => {
    context = {
      url: '/',
      output: {
        prepend: (context) => { return ''; },
        append: (context) => { return ''; },
        filter: (output, context) => { return output },
        appendHead: (context) => { return ''; },
        template: 'default',
        cacheTags: new Set()
      },
      server: {
        app: null,
        response,
        request: null
      },
      meta: null,
      vs: {
        config: null,
        storeCode: ''
      }
    };
  });

  it('should call redirect method from temp context', () => {
    addRedirectTempObject(context, response)
    context.server.response = createRedirectProxy(context, response)
    context.server._redirect.isPending = () => true

    const spy = jest.spyOn(context.server._redirect, 'handler')
    const spy2 = jest.spyOn(response, 'redirect')

    context.server.response.redirect('/checkout')

    expect(spy).toHaveBeenCalled();
    expect(spy2).not.toHaveBeenCalled();
  });

  it('should return normal express response object if there is no temp redirection object', () => {
    context.server.response = createRedirectProxy(context, response)

    const spy = jest.spyOn(response, 'redirect')

    context.server.response.redirect('/checkout')

    expect(spy).toHaveBeenCalled();
  });
});
