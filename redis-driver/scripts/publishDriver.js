/* eslint-disable unicorn/no-process-exit, unicorn/prefer-module */
const path = require('path');
const { publishPackages } = require('./lib/publishNpm');

const myArgs = process.argv.slice(2);
const labels = myArgs[0];

publishPackages(path.join(process.cwd()), labels)
  .then(console.log)
  .catch((e) => {
    console.error(e);
  });
