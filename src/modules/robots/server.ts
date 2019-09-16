
module.exports = (app) => {
  app.get('/robots.txt', (req, res) => {
    res.end('User-agent: *\nDisallow: ')
  })
}
