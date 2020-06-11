const fs = require('fs')
const path = require('path')

const getVersion = (installationDir) => {
  try {
    return JSON.parse(fs.readFileSync(path.join(installationDir, '/package.json'))).version
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

module.exports = {
  getVersion
}
