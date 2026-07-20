const assert = require('assert')
const fs = require('fs')
const path = require('path')

const rootPath = path.resolve(__dirname, '../..')
const readProjectFile = filePath => fs.readFileSync(path.join(rootPath, filePath), 'utf8')

const generateFiles = readProjectFile('core/scripts/generate-files.ts')
const webpackBase = readProjectFile('core/build/webpack.base.config.ts')
const webpackClient = readProjectFile('core/build/webpack.client.config.ts')
const webpackServer = readProjectFile('core/build/webpack.server.config.ts')
const webpackServiceWorker = readProjectFile('core/build/webpack.prod.sw.config.ts')
const server = readProjectFile('core/scripts/server.ts')
const containerEntrypoint = readProjectFile('docker/vue-storefront/vue-storefront.sh')

assert.match(generateFiles, /core\/build\/config\.json|\.\.\/build\/config\.json/)
assert.match(generateFiles, /JSON\.stringify\(config\)/)
assert.match(webpackBase, /'config': path\.resolve\(__dirname, '\.\/config\.json'\)/)
assert.match(webpackBase, /purge-config\/purgeConfigLoader\.ts/)

for (const webpackConfig of [webpackClient, webpackServer, webpackServiceWorker]) {
  assert.match(webpackConfig, /import base from '\.\/webpack\.base\.config'/)
}

assert.match(server, /const config = require\('config'\)/)
assert.match(server, /process\.env\.PORT \|\| config\.server\.port/)
assert.match(server, /process\.env\.HOST \|\| config\.server\.host/)
assert.match(server, /process\.env\.KEEP_ALIVE_TIMEOUT \|\| config\.server\.keepAliveTimeout/)

const configTemplatePosition = containerEntrypoint.indexOf('envsubst < config/local.json.template')
const buildPosition = containerEntrypoint.indexOf('yarn build')
assert(configTemplatePosition >= 0 && configTemplatePosition < buildPosition)

console.log('Configuration lifecycle assertions passed')
