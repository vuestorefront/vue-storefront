export interface SearchResponse {
  items: any[],
  total: number,
  start: number,
  perPage: number,
  aggregations: any,
  offline?: boolean,
  cache?: boolean,
  noresults?: boolean,
  suggestions: any
}
