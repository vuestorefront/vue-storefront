export default interface Response {
  items: any[]
  total: number
  start: number
  perPage: number
  aggregations: any
  offline?: boolean
  cache?: boolean
  noresults?: boolean
}
