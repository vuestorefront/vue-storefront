const config = require('config')
let trace = require('@google-cloud/trace-agent')
if (config.server.trace.enabled) {
  trace.start(config.server.trace.config)
}
