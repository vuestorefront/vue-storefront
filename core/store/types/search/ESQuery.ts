export default interface ESQuery {
  index: any
  type: string
  body: any
  size: number
  from: number
  sort: string
  _sourceExclude?: string
  _sourceInclude?: string
}
