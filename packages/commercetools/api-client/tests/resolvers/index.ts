const resolvers = {
  Query: {
    product: () => {
      return { id: 'test id', key: 'example key', version: 2 }
    }
  }
}

export default resolvers
