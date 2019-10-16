export interface SearchRequest {
  store: any,
  type: string,
  searchQuery: any,
  size: number,
  groupId: any,
  groupToken: any,
  from: number,
  sort: string,
  _sourceExclude?: string,
  _sourceInclude?: string
}
