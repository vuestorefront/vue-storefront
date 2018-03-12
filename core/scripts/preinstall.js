const path = require('path')
const fs = require('fs')
const childProcess = require('child_process')

const root = process.cwd()
npmInstallRecursive(root)

// Since this script is intended to be run as a "preinstall" command,
// it will do `npm install` automatically inside the root folder in the end.
console.log('===================================================================')
console.log(`Performing "npm install" inside root folder`)
console.log('===================================================================')

// Recurses into a folder
function npmInstallRecursive (folder) {
  const hasPackageJson = fs.existsSync(path.join(folder, 'package.json'))

  // If there is `package.json` in this folder then perform `npm install`.
  //
  // Since this script is intended to be run as a "preinstall" command,
  // skip the root folder, because it will be `npm install`ed in the end.
  // Hence the `folder !== root` condition.
  //
  if (hasPackageJson && folder !== root) {
    console.log('===================================================================')
    console.log(`Performing "npm install" inside ${folder === root ? 'root folder' : './' + path.relative(root, folder)}`)
    console.log('===================================================================')

    npmInstall(folder)
  }

  // Recurse into subfolders
  for (let subfolder of subfolders(folder)) {
    npmInstallRecursive(subfolder)
  }
}

// Performs `npm install`
function npmInstall (where) {
  childProcess.execSync('npm install', { cwd: where, env: process.env, stdio: 'inherit' })
}

// Lists subfolders in a folder
function subfolders (folder) {
  return fs.readdirSync(folder)
    .filter(subfolder => fs.statSync(path.join(folder, subfolder)).isDirectory())
    .filter(subfolder => subfolder !== 'node_modules' && subfolder[0] !== '.')
    .map(subfolder => path.join(folder, subfolder))
}
