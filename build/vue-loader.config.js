const path = require('path')
module.exports = {
    loaders: {
      scss:  'vue-style-loader!css-loader!sass-loader?includePaths' + JSON.stringify({
        includePaths: [
            path.resolve(__dirname, 'node_modules'),
        ]
      }), // <style lang="scss">
      sass: 'vue-style-loader!css-loader!sass-loader?indentedSyntax' // <style lang="sass">
    },
    optimizeSSR: false,
    preserveWhitespace: false   
}
