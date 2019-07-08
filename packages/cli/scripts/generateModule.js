const fse = require('fs-extra')
const path = require('path')
const replace = require('replace-in-file')
const cwd = process.cwd()
const boilerplatePath = path.resolve(__dirname, '../boilerplates/module')

module.exports = function (moduleName) {
  const modulePath = cwd + '/vsf-' + moduleName
  const replacementOptions = {
    files: [modulePath + '/**/*.*'],
    from: 'vsf-package',
    to: 'vsf-' + moduleName
  }

  fse.copy(boilerplatePath, modulePath, (err) => {
    if (err) {
      console.error(err)
    } else {
      replace(replacementOptions)
        .catch(error => console.error('Error occurred:', error))
      console.log('Module vsf-' + moduleName + ' has been succesfully created!\n cd vsf-' + moduleName)
    }
  })
}
