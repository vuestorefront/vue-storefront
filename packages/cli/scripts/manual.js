module.exports = function () {
  console.log('Usage: vsf [command] [options]\n')
  console.log('Options:')
  console.log(' --help                  available commands')
  console.log(' --version               CLI version\n')
  console.log('Commands:')
  console.log(' init [dir]              setup new VS project')
  console.log(' init:module [name]      generate vs module boilerplate')
}
