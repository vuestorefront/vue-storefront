import { InjectManifest } from 'workbox-webpack-plugin'

export default new InjectManifest({
  swDest: "sw.js",
  swSrc: "core/modules/pwa/service-worker.js"
})