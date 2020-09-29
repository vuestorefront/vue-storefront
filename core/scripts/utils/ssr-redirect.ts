function isPending (): boolean {
  return !!this.server._redirect.pendingPath
}

interface RedirectOptions {
  // status code, by default we will use 302
  code?: number
}

// Redirection resolver type
export type SsrRedirectResolve = (path: string, options: RedirectOptions) => void
/*
 * Resolve redirection only once per request.
 */
function resolve (path: string, {
  code = 302
}: RedirectOptions) {
  // normal express redirection
  this.server.response.redirect(code, path)
  // clear temp object
  Object.keys(this.server._redirect).forEach((key) => delete this.server._redirect[key])
}

// Redirection handler type
export type SsrRedirect = (path: string, options?: RedirectOptions) => void
/**
 * Creates ssr redirection resolver
 * @param path - redirection path - can exist one at the moment, can't override it
 * @param options - check RedirectOptions type
 */
function redirect (path: string, options?: RedirectOptions) {
  // check if we already start redirection - prevent duplicate
  if (this.server._redirect.isPending()) return

  const isSamePath = this.url === path
  if (isSamePath) return

  // lock path
  if (typeof path !== 'string') throw new Error(`Redirection path needs to be a string`)
  this.server._redirect.pendingPath = path

  this.server._redirect.resolve = resolve.bind(this, path, options || {})
}

export function createContextRedirection (): SsrRedirect {
  this.server._redirect = {
    isPending: isPending.bind(this)
  }

  return redirect.bind(this)
}
