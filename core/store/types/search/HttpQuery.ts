export default interface HttpQuery {
  q?: string
  size: number
  from: number
  sort: string
  _source_exclude?: string
  _source_include?: string
}
