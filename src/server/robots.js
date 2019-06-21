const fs = require('fs')
const themePath = require('../../core/build/theme-path')
const robots = `${themePath}/assets/robots.txt`

module.exports = expressApp => {
  expressApp.get('/robots.txt', (req, res) => {
    if (fs.existsSync(robots)) {
      res.type('text/plain')
      res.sendFile(robots)
    } else {
      res.end('User-agent: *\nDisallow: ')
    }
  })
}