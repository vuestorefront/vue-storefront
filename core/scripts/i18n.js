// @ts-check
const fs = require('fs')
const dsvFormat = require('d3-dsv').dsvFormat
const dsv = dsvFormat(',')
const program = require('commander')

program
  .command('migrate')
  .option('-d|--directory <directory>', 'location of the translation files')
  .action((cmd) => {
    if (fs.existsSync(cmd.directory)) {
      
    } else {
      console.log(`This directory doesn't exist`)
      process.exit(1)
    }
  })


program
  .on('command:*', () => {
    console.error('Invalid command: %s\nSee --help for a list of available commands.', program.args.join(' '));
    process.exit(1);
  });

program
  .parse(process.argv)

process.on('unhandledRejection', (reason, p) => {
  console.error(`Unhandled Rejection at: Promise ${p}, reason: ${reason}`)
  // application specific logging, throwing an error, or other logic here
})

process.on('uncaughtException', function (exception) {
  console.error(exception) // to see your exception details in the console
  // if you are on production, maybe you can send the exception details to your
  // email as well ?
})