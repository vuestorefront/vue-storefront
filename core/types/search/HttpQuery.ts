export default interface HttpQuery {
  q?: string,
  size: number,
  from: number,
  sort: string,
  request?: string,
  _source_exclude?: string,
  _source_include?: string
}
