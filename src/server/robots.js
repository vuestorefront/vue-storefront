
module.exports = (expressApp) => {
  expressApp.get('/robots.txt', (req, res) => {
    res.end('User-agent: *\nDisallow: ')
  })
}
