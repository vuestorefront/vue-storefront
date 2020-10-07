import { Express, Request, Response } from 'express'

export interface Context {
  url: string,
  output: {
    prepend: (context: any) => string,
    append: (context: any) => string,
    filter: <T>(output: T, context: any) => T,
    appendHead: (context: any) => string,
    template: string,
    cacheTags: Set<any>
  },
  server: {
    app: Express,
    response: ExpressResponseProxy,
    request: Request,
    _redirect?: RedirectTempObject
  },
  meta: any|null,
  vs: {
    config: Record<any, any>,
    storeCode: string
  }
}

export interface RedirectTempObject {
  pendingPath: string,
  isPending: () => boolean,
  resolver (code?: number, path?: string): void,

  handler (path: string): void,
  handler (code: number, path: string): void,
  handler (path: string, code: number): void
}

export interface ExpressResponseProxy extends Omit<Response, 'redirect'> {
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
