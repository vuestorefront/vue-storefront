const config = require('config')
const elasticsearch = require('elasticsearch')

const client = new elasticsearch.Client({
  hosts: [
    'http://' + config.elasticsearch.EShost + ':' + config.elasticsearch.ESport
  ]
})

module.exports = client
