import { Express } from 'express'

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
    request: Express.Request
  },
  meta: any|null,
  vs: {
    config: Record<any, any>,
    storeCode: string
  }
}
