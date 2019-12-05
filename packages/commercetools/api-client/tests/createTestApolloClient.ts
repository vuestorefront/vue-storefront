import ApolloClient from 'apollo-client'
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory'
import { SchemaLink } from 'apollo-link-schema'
import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools'
import typeDefs from './../schema.graphql'

const createTestApolloClient = (): ApolloClient<NormalizedCacheObject> => {
  const schema = makeExecutableSchema({
    typeDefs,
    resolverValidationOptions: {
      requireResolversForResolveType: false
    }
  })

  addMockFunctionsToSchema({ schema })

  return new ApolloClient<NormalizedCacheObject>({
    link: new SchemaLink({ schema }),
    cache: new InMemoryCache(),
    typeDefs
  })
}

export default createTestApolloClient
