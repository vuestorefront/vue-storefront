const fs = require('fs');
const dir = 'core/build/tmp';
const overridingFilePath = 'core/build/tmp/sfui-override.js';
const overridingComponentsDir = 'src/themes/capybara/components/_overrides'

function build () {
  if (fs.existsSync('node_modules/@storefrontui/vue/index.js')) {

    fs.readFile('node_modules/@storefrontui/vue/index.js', 'utf8', (err,data) => {
      if (err) {
        return console.log(err);
      }

      // Replace relative links with absolute
      data = data.replace(new RegExp('./src', 'g'), '@storefrontui/vue/src').replace(new RegExp('"', 'g'), "'")
      
      // Override components
      const folders = ['atoms', 'molecules', 'organisms']
      const files = fs.readdirSync(overridingComponentsDir)

      folders.forEach(folder => {
        files.forEach(file => {
          file = file.split('.')[0]
          data = data.replace('@storefrontui/vue/src/components/' + folder + '/' + file + '/' + file + '.vue', '../../../src/themes/capybara/components/_overrides/' + file + '.vue')
        })
      })

      if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
      }
      
      fs.writeFile(overridingFilePath, data, 'utf8', function (err) {
          if (err) return console.log(err);
      });
    });
  }
}

function override () {
  build()
  fs.watch(overridingComponentsDir, (eventName, fileName) => {
    if (eventName === 'rename') {
      console.log('Overriding Storefront UI component:', fileName)
      build()
    }
  })
}

function clear () {
  console.log('removing Storefront UI override')
}

module.exports = {
  override,
  clear
}