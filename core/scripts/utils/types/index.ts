import { Express } from 'express'
import { SsrRedirect, SsrRedirectResolve } from './../ssr-redirect'

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
    response: Express.Response,
    request: Express.Request,
    redirect: SsrRedirect,
    _redirect: {
      pendingPath: string,
      isPending: () => boolean,
      resolve: SsrRedirectResolve
    }
  },
  meta: any|null,
  vs: {
    config: Record<any, any>,
    storeCode: string
  }
}
