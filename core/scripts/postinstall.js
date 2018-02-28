const path = require('path')
const fs = require('fs')
const child_process = require('child_process')

const root = process.cwd()
// Since this script is intended to be run as a "postinstall" command,
console.log('==================================================================================')
console.log(`Applying vue-carousel hotfix for https://github.com/SSENSE/vue-carousel/issues/139`)
console.log('==================================================================================')

child_process.execSync('cp core/scripts/hotfixes/vue-carousel.min.js src/themes/default/node_modules/vue-carousel/dist', { cwd: root, env: process.env, stdio: 'inherit' })

// TODO: Add boilerplate instalation regarding https://github.com/DivanteLtd/vue-storefront/issues/753
