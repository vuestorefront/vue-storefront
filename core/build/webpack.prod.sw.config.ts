import { InjectManifest } from 'workbox-webpack-plugin'

export default {
  plugins: [
    new InjectManifest({
      mode: 'production',
      swSrc: './core/service-worker/index.js',
      swDest: 'service-worker.js',
      exclude: [ /\.html$/ ]
    })
  ]
}
