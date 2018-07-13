const path = require('path')
const config = require('config')
const { fileLoader, mergeResolvers } = require('merge-graphql-schemas')

const resolversArray = fileLoader(
  path.join(__dirname, `./${config.server.searchEngine}/*/resolver.js`)
)

module.exports = mergeResolvers(resolversArray, { all: true })
// export default mergeResolvers(resolversArray)
