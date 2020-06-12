#!/usr/bin/env node

const command = process.argv[2]

switch (command) {
  case 'init':
    require('./scripts/install.js')(process.argv[3])
    break;
  case 'init:module':
    require('./scripts/generateModule.js')(process.argv[3])
    break;
  case 'init:theme':
    require('./scripts/installTheme.js')()
    break;
  case '-h':
  case '--help':
    require('./scripts/manual.js')()
    break;
  case '-v':
  case '--version':
    console.log('v' + require('./package.json').version)
    break;
  default:
    console.log('Unknown command. try one of those:\n')
    require('./scripts/manual.js')()
}
