In order to create a GraphQl extension on VueStoreFront, you need to work on 2 steps :

### 1. Extend VS-API with your GraphQL entity

First you need to extend the API in order to provide to VSF the data related to your GraphQL entity

To achieve this, you simply have to create :
- one or more `*.graphqls` files with the extension schema(s)
- a `resolver.js` file with the extension entity resolvers

For example :

file `src/api/extensions/demo-graphql-extension/schema.graphqls`
```
type Query {
    hello(name: String): String
}
```

file `src/api/extensions/demo-graphql-extension/resolver.js`
```
const resolver = {
  Query: {
    hello: (parent, args) => {
      const { name } = args
      return `hello ${name}`
    }
  }
};

export default resolver;
```

Resolvers and schemas will be merge with the core ones.

### 2. Retrieve the data in VSF

When your custom GraphQL entity is available from your VS-API (you can test it with graphiql on [http://localhost:8080/graphiql](http://localhost:8080/graphiql)), the second step consists on retrieving this data in your VSF application

In order to do this, you need to create an extension on VSF side. To get started, it is recommended to copy the demo `src/extensions/sample-custom-entity-graphql` extension.
 
Now you only have to edit the following elements :
- your extension details in `src/extensions/demo-custom-entity-graphql/package.json`
```
{
  "name": "@vue-storefront/demo-custom-entity-graphql",
  "version": "1.0.0",
  "description": "Demo GraphQL Extension for Vue Storefront",
  "license": "MIT",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "publishConfig": {
    "access": "public"
  }
}

```
- in your extension entrypoint `src/extensions/demo-custom-entity-graphql/index.js`

```
const EXTENSION_KEY = 'demo-custom-entity-graphql'
const TEST_ENTITY_TYPE = 'hello'
```

Define your graphql request in a separated file in the `queries` subfolder of your extension
Basic example :
- file `src/extensions/demo-custom-entity-graphql/queries/hello.gql`
```
query helloDemo
{
  hello(name: "yoann")
}
```
- update the request file called in `src/extensions/demo-custom-entity-graphql/index.js`
```
query: require('./queries/hello.gql'), //line 29
```

Enable your extension in `src/extensions/index.js`
```
extensionList.push(require('@vue-storefront/demo-custom-entity-graphql/index.js'))
```

That's all done ! Your VSF extension is now retrieving your custom GraphQL entity data, you can now use them as you want in your application
