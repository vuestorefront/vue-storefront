const fs = require('fs')
const path = require('path')

const getVsfPackageJSON = (installationDir, quiet) => {
  try {
    return JSON.parse(fs.readFileSync(path.join(installationDir, '/package.json')))
  } catch (err) {
    if (quiet) return {}
    console.error(err)
    process.exit(1)
  }
}

module.exports = {
  getVsfPackageJSON
}
