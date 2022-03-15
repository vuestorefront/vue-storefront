export interface CacheControlModuleParams {
  default?: string
  matchRoute?: {
    [key: string]: string
  }
  blacklist?: string[]
}
