import ApolloClient from 'apollo-client'
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory'
import { SchemaLink } from 'apollo-link-schema'
import { makeExecutableSchema } from 'graphql-tools'
import typeDefs from './../schema.graphql'
import resolvers from './../tests/resolvers'

const createTestApolloClient = (): ApolloClient<NormalizedCacheObject> => {
  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
    resolverValidationOptions: {
      requireResolversForResolveType: false
    }
  })

  return new ApolloClient<NormalizedCacheObject>({
    link: new SchemaLink({ schema }),
    cache: new InMemoryCache(),
    typeDefs
  })
}

export default createTestApolloClient
