const config = require('config')
const elasticsearch = require('elasticsearch')

const client = new elasticsearch.Client({
  hosts: [
    'http://' + config.elasticsearch.host + ':' + config.elasticsearch.port
  ]
})

module.exports.client = client
