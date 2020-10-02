import { Express, Request } from 'express'
import { RedirectTempObject, ExpressReponseProxy } from './../ssr-redirect'

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
    response: ExpressReponseProxy,
    request: Request,
    _redirect: RedirectTempObject
  },
  meta: any|null,
  vs: {
    config: Record<any, any>,
    storeCode: string
  }
}
