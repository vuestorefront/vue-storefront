import { Response } from 'express'
import { Context, ExpressResponseProxy, RedirectTempObject } from './types'

function createIsPending (context: Context): () => boolean {
  return () => !!context.server._redirect.pendingPath
}

/*
 * Resolve redirection only once per request.
 */
function createResolveMethod (context: Context, expressResponse: Response) {
  return (code: number, path: string) => {
    if (!context.server._redirect.isPending()) return

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
    context.server._redirect.resolver = context.server._redirect.resolver.bind(null, redirectionCode, redirectionPath)
  }

  return redirect
}

/**
 * Builds temporary object that will handle redirection
 */
export function addRedirectTempObject (context: Context, expressResponse: Response) {
  const redirectTempObject: RedirectTempObject = {
    isPending: createIsPending(context),
    resolver: createResolveMethod(context, expressResponse),
    pendingPath: null,
    handler: createRedirectMethod(context)
  }
  context.server._redirect = redirectTempObject
}

/**
 * proxy creation takes place only once while context is created
 */
export function createRedirectProxy (context: Context, expressResponse: Response): ExpressResponseProxy {
  if (!context.server._redirect) {
    console.warn(`Something went wrong while creating vsf redirection handler. Fallback to normal express redirect`)
    return expressResponse
  }

  const ProxyConstructor = Proxy || require('proxy-polyfill/src/proxy')

  // returns proxy for Express Response object
  return new ProxyConstructor(expressResponse, {
    get (target, propKey) {
      // 'redirect' can be called multiple times and we want to reuse same method
      if (propKey === 'redirect') {
        return context.server._redirect.handler
      }

      const originalMethod = target[propKey]
      return originalMethod
    }
  })
}
