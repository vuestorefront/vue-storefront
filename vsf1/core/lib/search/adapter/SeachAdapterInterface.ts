interface SearchAdapterInterface {
  search(Request: any): void,
  registerEntityType(entityType: string, options: any): void
}
