import { Express } from 'express'

export interface Context {
  url: string,
  output: {
    prepend: (context: any) => string,
    append: (context: any) => string,
    filter: <T>(output: T, context: any) => T,
    appendHead: (context: any) => string,
    template: string,
    cacheTags: Set<any>,
    redirect: { code: 301 | 302, path: string } | null
  },
  server: {
    app: Express,
    response: Express.Response,
    request: Express.Request
  },
  meta: any | null,
  vs: {
    config: Record<any, any>,
    storeCode: string
  },
  extendedHead: {
    append: (value: string) => void,
    inject: () => string
  } | null
}
