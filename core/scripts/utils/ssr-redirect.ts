import { Response } from 'express'
import { Context } from './types'

// Redirection resolver type
export type SsrRedirectResolve = (code: number, path: string) => void

function createIsPending (context: Context): () => boolean {
  return () => !!context.server._redirect.pendingPath
}

/*
 * Resolve redirection only once per request.
 */
function createResolveMethod (context: Context, expressResponse: Response) {
  return (code: number, path: string) => {
    // normal express redirection
    expressResponse.redirect(code, path)

    // clear temp object
    context.server._redirect = null
  }
}

function createRedirectMethod (context: Context) {
  function redirect (path: string): void
  function redirect (code: number, path: string): void
  function redirect (path: string, code: number): void
  function redirect (path) {
    let redirectionPath = path
    let redirectionCode = 302

    // allow code / url
    // same as is in Express
    if (arguments.length === 2) {
      if (typeof arguments[0] === 'number') {
        redirectionCode = arguments[0]
        redirectionPath = arguments[1]
      } else {
        redirectionCode = arguments[1]
      }
    }

    // check if we already started redirection - prevent duplicate
    if (context.server._redirect.isPending()) {
      console.warn(`You should prevent multiple 'redirect' calls. Only one redirection per request will be resolved.`)
      return
    }

    const isSamePath = context.url === redirectionPath
    if (isSamePath) return

    // lock path
    context.server._redirect.pendingPath = redirectionPath

    // fill up resolver with arguments
    context.server._redirect.resolve = context.server._redirect.resolve.bind(null, redirectionCode, redirectionPath)
  }

  return redirect
}

/**
 * Builds temporary object that will handle redirection
 */
export function createRedirectTempObject (context: Context, expressResponse: Response) {
  return {
    isPending: createIsPending(context),
    resolve: createResolveMethod(context, expressResponse),
    pendingPath: null
  }
}

export interface ExpressReponseProxy extends Omit<Response, 'redirect'> {

  /**
   * Redirect to the given `url` with optional response `status`
   * defaulting to 302.
   *
   * The resulting `url` is determined by `res.location()`, so
   * it will play nicely with mounted apps, relative paths,
   * `"back"` etc.
   *
   * Examples:
   *
   *    res.redirect('/foo/bar');
   *    res.redirect('http://example.com');
   *    res.redirect(301, 'http://example.com');
   *    res.redirect('http://example.com', 301);
   *    res.redirect('../login'); // /blog/post/1 -> /blog/login
   */
  redirect (path: string): void,
  redirect (code: number, path: string): void,
  redirect (path: string, code: number): void
}
/**
 * proxy creation takes place only once while context is created
 */
export function createRedirectProxy (context: Context, expressResponse: Response): ExpressReponseProxy {
  const ProxyConstructor = Proxy || require('proxy-polyfill/src/proxy')

  // redirect method will be reused so we need to keep it out of proxy scope
  const redirectMethod = createRedirectMethod(context)

  // returns proxy for Express Reponse object
  return new ProxyConstructor(expressResponse, {
    get (target, propKey) {
      const originalMethod = target[propKey]

      // 'redirect' can be called multiple times and we want to reuse same method
      if (propKey === 'redirect') {
        return redirectMethod
      }

      return originalMethod
    }
  })
}
