import { addRedirectTempObject, RedirectTempObject } from './../../ssr-redirect'
import { Context } from './../../types';

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
        request: null,
        _redirect: null
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
      resolve: jest.fn()
    }

    expect(Object.keys(context.server._redirect)).toEqual(expect.arrayContaining(Object.keys(expectedObject)));
  });

  it('should turn in pending state when pendingPath is filled', () => {
    expect(context.server._redirect.isPending()).toEqual(false);

    context.server._redirect.pendingPath = '/checkout'

    expect(context.server._redirect.isPending()).toEqual(true);
  });

  it('should not resolve redirection if its not pending', () => {
    context.server._redirect.resolve(302, '/checkout')

    expect(context.server._redirect).toBeTruthy();
    expect(response.redirect).not.toBeCalled()
  });

  it('should resolve redirection if its pending', () => {
    context.server._redirect.isPending = jest.fn(() => true)

    context.server._redirect.resolve(302, '/checkout')

    expect(context.server._redirect).toBeFalsy();
    expect(response.redirect).toBeCalled()
  });
});
