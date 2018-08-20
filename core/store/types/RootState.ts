export default interface RootState {
  version: string,
  attribute: string,
  category: {
    current_path: string
    current: {
      slug: string,
      name: string
    }
  },
  stock: {
    cache: any
  }
}
