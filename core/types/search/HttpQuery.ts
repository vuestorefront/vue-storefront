export default interface HttpQuery {
  q?: string,
  size: number,
  from: number,
  sort: string,
  request?: string,
  request_format?: string,
  response_format?: string,
  _source_exclude?: string,
  _source_include?: string
}
