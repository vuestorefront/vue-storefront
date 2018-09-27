
module.exports = (expressApp) => {
  expressApp.get('/sitemap.xml', (req, res) => {
    res.end('<sitemap />')
  })
}
