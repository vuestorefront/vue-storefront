import express from 'express'
import config from 'config'
import path from 'path'
const app = express()

const rootPath = require('app-root-path').path
const resolve = file => path.resolve(rootPath, file)
const isProd = true

const serve = (path, cache, options) => express.static(resolve(path), Object.assign({
  maxAge: cache && isProd ? 2592000000 : 0, // 1 month in milliseconds = 1000 * 60 * 60 * 24 * 30 = 2592000000
  fallthrough: false
}, options))

app.use('/', serve(resolve(config.staticPages.destPath), true, {
  setHeaders: function (res, path, stat) {
    if (path.endsWith('.svg')) {
      res.set('Content-Type', 'image/svg+xml; charset=UTF-8')
    } else {
      if (!path.endsWith('.js')) {
        res.set('Content-Type', 'text/html; charset=UTF-8')
      }
    }// TODO: add better mime type guessing
  }
}))

let port = process.env.PORT || config.server.port
const host = process.env.HOST || config.server.host
const start = () => {
  app.listen(port, host)
    .on('listening', () => {
      console.log(`Vue Storefront Static Server started at http://${host}:${port}`)
    })
    .on('error', (e: { code: string }) => {
      if (e.code === 'EADDRINUSE') {
        port = parseInt(port) + 1
        console.log(`The port is already in use, trying ${port}`)
        start()
      }
    })
}
start()
