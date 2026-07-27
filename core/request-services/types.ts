export interface RequestServices {
  host: string
  userAgent: string
  getCookie: (name: string) => string | undefined
  redirect?: (path: string, statusCode?: number) => void
}
