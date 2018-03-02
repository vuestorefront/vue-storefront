const path = require('path')
const fs = require('fs')
const child_process = require('child_process')

const root = process.cwd()
// Since this script is intended to be run as a "postinstall" command,
// TODO: Add boilerplate instalation regarding https://github.com/DivanteLtd/vue-storefront/issues/753
