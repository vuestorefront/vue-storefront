export default interface RootState {
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
