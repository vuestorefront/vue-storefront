
module.exports = (expressApp) => {
  /**
   * This is an example on how You can bind Your own Express.js server routes to SSR server running Vue Storefront.
   * It may be usefull to avoid all the Vue.js processing and context - and useful for example for large XML/binary file generation
   */
  expressApp.get('/file.xml', (req, res) => {
    res.end('<content />')
  })
}
