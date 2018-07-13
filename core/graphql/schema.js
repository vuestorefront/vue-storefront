
const path = require('path')
const config = require('config')
const { fileLoader, mergeTypes } = require('merge-graphql-schemas')

const typesArray = fileLoader(
  path.join(__dirname, `./${config.server.searchEngine}/*/*.graphqls`)
)

module.exports = mergeTypes(typesArray, { all: true })
