function isPending (): boolean {
  return !!this.redirect._pendingPath
}

interface RedirectOptions {
  // status code, by default we will use 302
  code?: number
}

// resolve redirection only once per request
function resolve (path: string, {
  code = 302
}: RedirectOptions) {
  this.server.response.redirect(code, path)
  this.redirect._pendingPath = null
}

/**
 * Make ssr redirection
 * @param path - redirection path - can exist one at the moment, can't override it
 * @param options - check RedirectOptions type
 */
type CreateSsrRedirect = (path: string, options?: RedirectOptions) => void

function create (path: string, options?: RedirectOptions): CreateSsrRedirect {
  // check if we already start redirection - prevent duplicate
  if (this.redirect.isPending()) return

  const isSamePath = this.url === path
  if (isSamePath) return

  // lock path
  if (typeof path !== 'string') throw new Error(`Redirection path needs to be a string`)
  this.redirect._pendingPath = path

  this.redirect.resolve = resolve.bind(this, path, options || {})
}

export interface SsrRedirect {
  create: CreateSsrRedirect,
  isPending: () => boolean
}

export function createContextRedirection (): SsrRedirect {
  return {
    create: create.bind(this),
    isPending: isPending.bind(this)
  }
}
